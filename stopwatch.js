// ==UserScript==
// @name     4me Stopwatch
// @version  1
// @grant    none
// @match    https://savaco-internal-it.4me.com/*
// ==/UserScript==

var div = document.getElementById('userbox');

div.innerHTML += '\
<h2 id="watch">00:00:00</h2>\
<div class="buttons">\
<button id="start">Start</button>\
<button id="pause">Pause</button>\
<button id="reset">Reset</button>\
</div>\
';

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
  watch.innerHTML= '00:00:00:00';
};

document.addEventListener('click', (e) =>{
  const el = e.target;
  if (el.id === 'start') startWatch();
  if (el.id === 'pause') pauseWatch();
  if (el.id === 'reset') resetWatch();
});