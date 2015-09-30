# chop-wrap

**A small browser module to recursively chop and wrap text nodes**

* Vanilla CSS
* IE>8

Can be useful to animate text, transform DOM text nodes into something else or whatever.

It can turn this html

```html
<div>
    <p>Sur une branche morte</p>
    <p>Les corbeaux se sont perchés</p>
    <p>Soir d'automne</p>
    <p><a href="https://fr.wikisource.org/wiki/Ha%C3%AFku">Bashō – XVIIe siècle</a></p>
</div>
```

in

```html

    <div>

        <blockquote cite="https://fr.wikisource.org/wiki/Ha%C3%AFku"><span class="wrap"></span>

            <p>
                <span class="wrap wrap--selected">Sur</span><span class="wrap"> </span><span
                class="wrap wrap--selected">une</span><span
                class="wrap"> </span><span class="wrap wrap--selected">branche</span><span class="wrap"> </span><span
                class="wrap wrap--selected">morte</span>
            </p>

            <p>
                <span class="wrap wrap--selected">Les</span><span class="wrap"> </span><span
                class="wrap wrap--selected">corbeaux</span><span
                class="wrap"> </span><span class="wrap wrap--selected">se</span><span class="wrap"> </span><span
                class="wrap wrap--selected">sont</span><span class="wrap"> </span><span class="wrap wrap--selected">perchés</span>
            </p>

            <p>
                <span class="wrap wrap--selected">Soir</span><span class="wrap"> </span><span
                class="wrap wrap--selected">d'automne</span>
            </p>

            <p>
                <a href="https://fr.wikisource.org/wiki/Ha%C3%AFku">
                    <span class="wrap wrap--selected">Bashō</span><span class="wrap"> </span><span
                    class="wrap wrap--selected">–</span><span class="wrap"> </span>
                    <span class="wrap wrap--selected">XVIIe</span><span class="wrap"> </span><span
                    class="wrap wrap--selected">siècle</span>
                </a>
            </p>

        </blockquote>

    </div>
```

## Principle :

* a function to transform the content of a text node into an array of tokens
* a function to wrap an array of token into tags, returning an HTML fragment
* a function to recursively walk down the DOM and applying the two composited functions above

The two first functions (the chopper and the wrapper) can be redefined by your own ones.


## Usage

``
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
```
