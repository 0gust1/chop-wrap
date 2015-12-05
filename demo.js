/* @flow */
'use strict';
const textSlicer = require('./');
const Velocity = require('velocity-animate');
require('velocity-animate/velocity.ui.js');

const node = document.getElementById('wrap_words');

textSlicer.chopWrap([node], {
  flagContainerClass: 'wrapped',
  wrapperTag: 'span',
  wrapperClass: 'wrap',
  selectionRegex: '\\S+',
  selectedClass: 'wrap--selected',
  wrapperFun: textSlicer.wrap,
  chopperFun: textSlicer.chopWords,
});

const node2 = document.getElementById('wrap_chars');
const node3 = document.getElementById('wrap_sentences');

textSlicer.chopWrap([node2], {
  flagContainerClass: 'wrapped',
  wrapperTag: 'span',
  wrapperClass: 'wrap',
  selectionRegex: '\\S+',
  selectedClass: 'wrap--selected',
  wrapperFun: textSlicer.wrap,
  chopperFun: textSlicer.chopChars,
});

textSlicer.chopWrap([node3], {
  flagContainerClass: 'wrapped',
  wrapperTag: 'span',
  wrapperClass: 'wrap',
  selectionRegex: '\\S+',
  selectedClass: 'wrap--selected',
  wrapperFun: textSlicer.wrap,
  chopperFun: textSlicer.chopSentences,
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

document.querySelector('.btn-animate-letters').addEventListener('click', () => {
  //removeDelayedClass('animate-letters','wrap--selected','animate-in',700);

  const transforms = [
    {
      //rotateY:'-200deg',
      //rotateZ:'360deg'
    },
    {
      //rotateY:'250deg',
      //rotateZ:'-256deg',
      scale3D: '3, 3, 3',
    },
    {
      //rotateY:'-200deg',
      //rotateZ:'360deg'
    },
  ].map(e => {
    Object.assign(e, randomAnim());
    return e;
  });

  /*
   * translateX(-100em) translateX(-5em) rotateY(250deg) rotateZ(-256deg) scale3D(3, 3, 3)
   * */

  delayedAnim('animate-letters', 'wrap--selected', 1000, 1000);

});

document.querySelector('.btn-animate-words').addEventListener('click', () => {
  removeDelayedClass('animate-words', 'wrap--selected', 'animate-in', 700);
});

document.querySelector('.btn-animate-letters2').addEventListener('click', () => {
  triggerDelayedClass('animate-letters', 'wrap--selected', 'animate-out', 1000);
});

document.querySelector('.btn-animate-words2').addEventListener('click', () => {
  triggerDelayedClass('animate-words', 'wrap--selected', 'animate-out', 1000);
});

function randomAnim() {
  const angle = Math.random() * 360;
  const rotateX = Math.random() * 720;
  const rotateY = Math.random() * 720;
  const rotateZ = Math.random() * 720;

  //const scale = Math.random()*3;

  return {
    translateX: Math.cos(angle) * 100 + 'em',
    translateY: Math.sin(angle) * 100 + 'em',
    rotateX: rotateX + 'deg',
    rotateY: rotateY + 'deg',
    rotateZ: rotateZ + 'deg',

    //rotateY: rotateY,
    //rotateZ: rotateY,
    //scale3D: scale3D
    //
  };
}

function getRandomAnims(num){
  return Array.from(new Array(6), () => randomAnim());
}

/**
 * Triggers animation on elements, with a random on-set delay
 * @param {String} containerClass
 * @param {String} wrapperClass
 * @param {String} animClass
 * @param {int} durationMax
 */
function triggerDelayedClass(containerClass, wrapperClass, animClass, durationMax) {
  const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);

  Array.from(elements, e  => {
    (function triggerAnim(el) {
      setTimeout(function() {
        el.classList.add(animClass);
      }, Math.random() * durationMax);
    })(e);
  });

}

/**
 * Triggers animation on elements, with a random on-set delay
 * @param {String} containerClass
 * @param {String} wrapperClass
 * @param {String} animClass
 * @param {int} durationMax
 */
function removeDelayedClass(containerClass, wrapperClass, animClass, durationMax) {
  const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);

  Array.from(elements, e => {
    (function triggerAnim(el) {
      setTimeout(function() {
        el.classList.remove(animClass);
      }, Math.random() * durationMax);
    })(e);
  });

}

function delayedAnim(containerClass, wrapperClass, duration, delayMax) {
  const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass);

  Array.from(elements, e =>{
    (function triggerAnim(el) {
      setTimeout(function () {
        Velocity(el, randomAnim(), duration);
      }, Math.random() * delayMax);
    })(e);
  });

}

function delayedVelocity(containerClass, wrapperClass, duration, delayMax) {
  const elements = document.querySelectorAll('.' + containerClass + ' .' + wrapperClass),
        num = 10,
        anims = getRandomAnims(num);

  Array.from(elements, e => {
    Velocity(e, anims[Math.floor(Math.random()*num)], {duration: duration, delay: Math.random() * delayMax});
  });

}


