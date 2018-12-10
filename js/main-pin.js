'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER_HEIGHT = 22;

  var mainPinElement = document.querySelector('.map__pin--main');

  var getCoordinatsFromPosition = function (position) {
    return {
      x: Math.floor(position.x + MAIN_PIN_WIDTH / 2),
      y: Math.floor(position.y + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT)
    };
  };

  var getCoordinats = function () {
    return getCoordinatsFromPosition(window.dragEndDrop.getElementPosition());
  };

  var getDefaultCoordinats = function () {
    return getCoordinatsFromPosition(window.dragEndDrop.getDefaultPositon());
  };

  var mainPinValidPosition = {
    minX: window.pinsArea.minX,
    maxX: window.pinsArea.maxX - MAIN_PIN_WIDTH,
    minY: window.pinsArea.minY,
    maxY: window.pinsArea.maxY - (MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT)
  };

  var initialize = function (onActivateMainPin) {
    var activateElementHandler = function (position) {
      onActivateMainPin(getCoordinatsFromPosition(position));
    };
    window.dragEndDrop.initialize(mainPinElement, mainPinValidPosition, activateElementHandler);
  };

  var setDefaults = function () {
    window.dragEndDrop.setDefaults();
  };

  window.mainPin = {
    initialize: initialize,
    setDefaults: setDefaults,
    getCoordinats: getCoordinats,
    getDefaultCoordinats: getDefaultCoordinats
  };
})();
