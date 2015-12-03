# chop-wrap

**A small browser module to recursively chop and wrap text nodes**

* Vanilla JS
* IE>8

By default, it can recursively chop words or letters and wrap them in a custom tag.

Can be useful to animate text, transform DOM text nodes into something else or whatever.

It can turn this html

```html
<div>
    <blockquote cite="https://fr.wikisource.org/wiki/Ha%C3%AFku"
        <p>Sur une branche morte</p>
        <p>Les corbeaux se sont perchés</p>
        <p>Soir d'automne</p>
        <p><a href="https://fr.wikisource.org/wiki/Ha%C3%AFku">Bashō – XVIIe siècle</a></p>
    </blockquote>
</div>
```

in

```html

    <div class="wrapped">

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

* a function to transform the content of a text node into an array of tokens : `String -> [String]`
* a function to wrap an array of token into tags, returning an HTML fragment `[String] -> DocumentFragment`
* a function to recursively walk down the DOM and applying the two composited functions above

The two first functions (the chopper and the wrapper) can be redefined by your own ones.


## Usage

With a JS packer (browserify, Webpack, etc.)

```javascript

var textSlicer = require('chop-wrap');

var node = document.getElementById('wrap_words');

textSlicer.chopWrap([node]);

```

It can take an optional option object.

```javascript

var textSlicer = require('chop-wrap');

var node = document.getElementById('wrap_words');

textSlicer.chopWrap([node],
                    {
                        flagContainerClass: 'wrapped', //applied to container
                        wrapperTag: 'span',
                        wrapperClass: 'wrap', //class of a wrapped elem
                        selectionRegex: '\\S+', //here, "everything but spaces"
                        selectedClass: 'wrap--selected', //applied if the regex is satisfied
                        wrapperFun: textSlicer.wrap, // Array<string> => DocumentFragment
                        chopperFun: textSlicer.chopWords // string => Array<string>
                    });

```

Currently you have 3 chopper functions available : `chopWords`, `chopChars` and `chopSentences`.

Make a Pull request to add your own !

## Build

Run `npm run dev` to launch the dev server





