var test = require('tape');
var textSlicer = require('../');

test('chopWords should return a well formed array of words', function (t) {
    var chunks = textSlicer.chopWords('  mon petit   chat gris :   ');
    t.deepEqual(chunks, [ 'mon', ' ', 'petit', ' ', 'chat', ' ', 'gris', ' ', ':' ]);
    t.end();
});

test('chopChars should return a well formed array of chars', function (t) {
    var chunks = textSlicer.chopChars('  mon petit   chat gris :   ');
    t.deepEqual(chunks, [ 'm', 'o', 'n', ' ', 'p', 'e', 't', 'i', 't', ' ', 'c', 'h', 'a', 't', ' ', 'g', 'r', 'i', 's', ' ', ':' ]);
    t.end();
});


