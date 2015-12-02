var textSlicer = {};

/**
 * External trim a String and normalize internal spaces
 * @param text
 * @returns {string}
 */
function internalTrim(text) {
  return text.trim().replace(/\s{2,}/, ' ');
}

/**
 * Splits a string into a trimmed array of 'words' (characters between spaces)
 * @param textContent
 * @returns {Array}
 */
textSlicer.chopSentences = function chopSentences(textContent) {
  var tokens = internalTrim(textContent).split(/([^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$))/);

  //(?=\S)(([.]{2,})?[^!?]+?([.…!?]+|(?=\s+$)|$)(\s*[′’'”″“")»]+)*)
  //[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)
  return tokens;
};

/**
 * Splits a string into a trimmed array of 'words' (characters between spaces)
 * @param textContent
 * @returns {Array}
 */
textSlicer.chopWords = function chopWords(textContent) {
  return internalTrim(textContent).split(/(\s+)/);
};

/**
 * Splits a string into a trimmed array of chars
 * @param textContent
 * @returns {Array}
 */
textSlicer.chopChars = function chopChars(textContent) {
  return internalTrim(textContent).split('');
};

/**
 * Returns a DocumentFragment consisting of token elements wrapped with a specified tag.
 * This tag will have the specified class if its content doesn't match the specified excluding regexp (or if this regexp is not present)
 * @param tokens
 * @param flagContainerClass
 * @param wrapperTag
 * @param wrapperClass
 * @param selectionRegex
 * @param selectedClass
 * @returns {DocumentFragment}
 */
textSlicer.wrap = function wrap(tokens, flagContainerClass, wrapperTag, wrapperClass, selectionRegex, selectedClass) {
  var d_ = window.document.createDocumentFragment();

  tokens.forEach(function(current) {
    var tag = window.document.createElement(wrapperTag);
    tag.innerHTML = current;
    tag.classList.add(wrapperClass);
    var reg = new RegExp(selectionRegex);
    if (reg && reg.test(current)) tag.classList.add(selectedClass);
    d_.appendChild(tag);
  });

  return d_;
};

/**
 * Return a chopwrap processing function
 * @param opts
 * @returns {Function}
 */
function chopAndWrapProcessor(opts) {

  return function(textcontent) {
    return opts.wrapperFun(opts.chopperFun(textcontent),
        opts.flagContainerClass,
        opts.wrapperTag,
        opts.wrapperClass,
        opts.selectionRegex,
        opts.selectedClass);
  };
}

//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
function isAllWS(node)
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(node.textContent));
}

/**
 * Process and transform recursively DOM text Nodes
 * @param elements {Array} Array of DOM nodes to process
 * @param processTextNodeFun {function} function using the textContent of a DOM node and returning a documentFragment
 * @param flagContainerClass {String}, flagContainerClass
 */
textSlicer.processTextNodes = function processTextNodes(elements, processTextNodeFun, flagContainerClass) {

  elements.forEach(function(element) {
    element.normalize();

    element.classList.add(flagContainerClass);
    var child = element.firstChild;
    while (child) {
      // have to get a reference before we replace the child node
      var nextSibling = child.nextSibling;
      if (!isAllWS(child)) {
        if (child.nodeType === 1) { // element node
          textSlicer.processTextNodes([child], processTextNodeFun);
        } else if (child.nodeType === 3) { // text node
          var fragment = processTextNodeFun(child.textContent);
          child.parentNode.replaceChild(fragment, child);
        }
      }

      child = nextSibling;
    }
  });
};

function mergeObjects() {
  var resObj = {};

  Array.prototype.slice.call(arguments).forEach(function(e) {
    var keys = Object.keys(e);
    keys.forEach(function(k) {
      resObj[k] = e[k];
    });
  });

  return resObj;
}

var defaultChopWrapOptions = {

  flagContainerClass: 'wrapped',
  wrapperTag: 'span',
  wrapperClass: 'wrap',
  selectionRegex: '\\S+',
  selectedClass: 'wrap--selected',
  wrapperFun: textSlicer.wrap,
  chopperFun: textSlicer.chopWords
};

textSlicer.chopWrap = function(elements, options) {
  var opts = mergeObjects(defaultChopWrapOptions, options ? options : {});
  var textNodeProcessor = chopAndWrapProcessor(opts);
  textSlicer.processTextNodes(elements, textNodeProcessor, opts.flagContainerClass);
};

module.exports = textSlicer;
