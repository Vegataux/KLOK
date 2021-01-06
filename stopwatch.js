// ==UserScript==
// @name     4me Stopwatch
// @author   Thomas&Hannes
// @version  4.5
// @grant    none
// @match    https://savaco-internal-it.4me.com/*
// @upateURL https://raw.githubusercontent.com/Vegataux/KLOK/main/stopwatch.js
// @downloadURL https://raw.githubusercontent.cohm/Vegataux/KLOK/main/stopwatch.js
// ==/UserScript==

var clock         = document.createElement ('div');
clock.innerHTML   = '\
<style>\
h5{\
color: white;\
}\
</style>\
<div style="display: flex;padding-top: 6px;height: 26px;right:270px;position:fixed;z-index:99999";>\
<h5 id="watch">00:00:00</h5>\
<button id="start">Start</button>\
<button id="pause">Pause</button>\
<button id="reset">Reset</button>\
</div>\
';

document.body.appendChild (clock);


const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

function startWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  timer = setInterval(()=>{
    milliseconds += 10;
    let dateTimer = new Date(milliseconds);
    watch.innerHTML =
      ('0'+dateTimer.getUTCHours()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCSeconds()).slice(-2) ;
  },10);
};

function pauseWatch() {
  watch.classList.add('paused');
  clearInterval(timer);
};

function resetWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML= '00:00:00';
};

document.addEventListener('click', (e) =>{
  const el = e.target;
  if (el.id === 'start') startWatch();
  if (el.id === 'pause') pauseWatch();
  if (el.id === 'reset') resetWatch();
});
