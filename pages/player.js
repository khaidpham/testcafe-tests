const { ClientFunction, Selector } = require('testcafe');

const Player = {
  video: Selector('.vjs-tech'),
  play: ClientFunction((n = 0) => document.querySelectorAll('.vjs-tech')[n].play()),
  pause: ClientFunction((n = 0) => document.querySelectorAll('.vjs-tech')[n].pause()),
  duration: ClientFunction((n = 0) => document.querySelectorAll('.vjs-tech')[n].duration),
  currentTime: ClientFunction((n = 0) => document.querySelectorAll('.vjs-tech')[n].currentTime),
  setTime: ClientFunction((n = 0, time) => document.querySelectorAll('.vjs-tech')[n].currentTime = time),
};

module.exports = { Player };