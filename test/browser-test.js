var test = require('tape'),
    fs = require('fs'),
    textSlicer = require('../');


var resultChopWrapWords = "",
    startText1 = "Je fais souvent ce rêve étrange et pénétrant D’une femme inconnue, et que j’aime, et qui m’aime, Et qui n’est, chaque fois, ni tout à fait la mêm Ni tout à fait une autre, et m’aime et me comprend.",
    resultChaopWrapChars = "";


test('testing nav', function (t) {
    //t.plan(2);
    t.equal('toto','toto');

    var node = document.getElementById('wrap_words');
    console.log(node.textContent);
    t.end();
});

test('chop and wrap words should work correctly', function (t) {
    var nodes = document.querySelectorAll('#wrap_words');
    textSlicer.chopWrap(nodes,{
        flagContainerClass: 'wrapped',
        wrapperTag: 'span',
        wrapperClass: 'wrap',
        selectionRegex: '\\S+',
        selectedClass: 'wrap--selected',
        wrapperFun: textSlicer.wrap,
        chopperFun: textSlicer.chopWords
    });
    t.equal(node.innerHTML,resultChopWrapWords);
    t.end();
});