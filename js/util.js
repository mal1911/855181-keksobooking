'use strict';
(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getMixArray = function (arr) {
    return arr.slice().sort(function () {
      return 0.5 - Math.random();
    });
  };

  var getClipArray = function (arr, count) {
    return arr.slice(0, count - 1);
  };

  window.util = {
    getRandomInt: getRandomInt,
    getMixArray: getMixArray,
    getClipArray: getClipArray
  };
})();
