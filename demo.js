'use strict';
const textSlicer = require('./');
const Velocity = require('velocity-animate');
require('velocity-animate/velocity.ui.js');

const node = document.getElementById('wrap_words');


textSlicer.chopWrap([node],{
    flagContainerClass: 'wrapped',
    wrapperTag: 'span',
    wrapperClass: 'wrap',
    selectionRegex: '\\S+',
    selectedClass: 'wrap--selected',
    wrapperFun: textSlicer.wrap,
    chopperFun: textSlicer.chopWords
});


const node2 = document.getElementById('wrap_chars');
const node3 = document.getElementById('wrap_sentences');

textSlicer.chopWrap([node2],{
    flagContainerClass: 'wrapped',
    wrapperTag: 'span',
    wrapperClass: 'wrap',
    selectionRegex: '\\S+',
    selectedClass: 'wrap--selected',
    wrapperFun: textSlicer.wrap,
    chopperFun: textSlicer.chopChars
});

textSlicer.chopWrap([node3],{
    flagContainerClass: 'wrapped',
    wrapperTag: 'span',
    wrapperClass: 'wrap',
    selectionRegex: '\\S+',
    selectedClass: 'wrap--selected',
    wrapperFun: textSlicer.wrap,
    chopperFun: textSlicer.chopSentences
});

/*
textSlicer.chopWrap([node3],{
    flagContainerClass: 'wrapped',
    wrapperTag: 'span',
    wrapperClass: 'wrap',
    selectionRegex: '\\S+',
    selectedClass: 'wrap--selected',
    wrapperFun: textSlicer.wrap,
    chopperFun: textSlicer.chopSentences
});
*/


document.querySelector('.btn-animate-letters').addEventListener("click", () => {
    //removeDelayedClass('animate-letters','wrap--selected','animate-in',700);

    const transforms = [
        {
            //rotateY:'-200deg',
            //rotateZ:'360deg'
        },
        {
            //rotateY:'250deg',
            //rotateZ:'-256deg',
            scale3D:'3, 3, 3'
        },
        {
            //rotateY:'-200deg',
            //rotateZ:'360deg'
        }
    ].map(e => {
        Object.assign(e,randomAnim());
        return e;
    });

    /*
    * translateX(-100em) translateX(-5em) rotateY(250deg) rotateZ(-256deg) scale3D(3, 3, 3)
    * */

    delayedVelocity('animate-letters',
                'wrap--selected',
                1000,
                1000);
});

document.querySelector('.btn-animate-words').addEventListener("click", () => {
    removeDelayedClass('animate-words','wrap--selected','animate-in',700);
});

document.querySelector('.btn-animate-letters2').addEventListener("click",  () =>  {
    triggerDelayedClass('animate-letters','wrap--selected','animate-out',1000);
});

document.querySelector('.btn-animate-words2').addEventListener("click",  () =>  {
    triggerDelayedClass('animate-words','wrap--selected','animate-out',1000);
});

function randomAnim(){
        const angle = Math.random()*360;
        const rotateX = Math.random()*720;
        const rotateY =Math.random()*720;
        const rotateZ =Math.random()*720;
        //const scale = Math.random()*3;

        return {
            translateX: Math.cos(angle)*100+"em",
            translateY: Math.sin(angle)*100+"em",
            rotateX: rotateX+"deg",
            rotateY: rotateY+"deg",
            rotateZ: rotateZ+"deg",
            //rotateY: rotateY,
            //rotateZ: rotateY,
            //scale3D: scale3D
            //
        };
    }

/**
 * Triggers animation on elements, with a random on-set delay
 * @param containerClass
 * @param wrapperClass
 * @param animClass
 * @param durationMax
 */
function triggerDelayedClass(containerClass, wrapperClass, animClass, durationMax) {
    const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);
    for (var i = elements.length - 1; i >= 0; i--) {
        (function triggerAnim(el) {
            setTimeout(function() {
                el.classList.add(animClass);
            }, Math.random() * durationMax);
        })(elements[i]);
    }
}

/**
 * Triggers animation on elements, with a random on-set delay
 * @param containerClass
 * @param wrapperClass
 * @param animClass
 * @param durationMax
 */
function removeDelayedClass(containerClass, wrapperClass, animClass, durationMax) {
    const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);

    for (var i = elements.length - 1; i >= 0; i--) {
        (function triggerAnim(el) {
            setTimeout(function() {
                el.classList.remove(animClass);
            }, Math.random() * durationMax);
        })(elements[i]);
    }
}

function delayedAnim(containerClass, wrapperClass ,transforms, duration, delayMax){
    const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);
    for (var i = elements.length - 1; i >= 0; i--) {
        (function triggerAnim(el) {
            setTimeout(function() {

                /*if(el.matches('.'+wrapperClass+':nth-of-type(5n)')){
                    Velocity(el,transforms[0],duration);
                }else if(el.matches('.'+wrapperClass+':nth-of-type(3n)')){
                    Velocity(el,transforms[1],duration);
                }else{
                    Velocity(el,transforms[2],duration);
                }*/

                Velocity(el,randomAnim(),duration);

            }, Math.random() * delayMax);
        })(elements[i]);
    }
}


function delayedVelocity(containerClass, wrapperClass , duration, delayMax){
    const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);
    for (var i = elements.length - 1; i >= 0; i--) {
        Velocity(elements[i],randomAnim(),{duration: duration, delay: Math.random()*delayMax});
    }
}


/**
 *
 * Init
 */
/*var forEach = Array.prototype.forEach;
var nodes = document.querySelectorAll('.wrap--selected');
forEach.call(nodes, function( e ){
    e.classList.add('animate-in');
});
*/
