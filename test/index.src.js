var textSlicer = require('../');

var node = document.getElementById('wrap_words');
node.normalize();
console.log(node.textContent);

textSlicer.chopWrap([node],{
    flagContainerClass: 'wrapped',
    wrapperTag: 'span',
    wrapperClass: 'wrap',
    selectionRegex: '\\S+',
    selectedClass: 'wrap--selected',
    wrapperFun: textSlicer.wrap,
    chopperFun: textSlicer.chopWords
});

console.log('sliced HTML :\n' + node.innerHTML);