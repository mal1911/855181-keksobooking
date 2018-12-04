'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER_HEIGHT = 22;

  var mainPinActived;
  var mainPinElement = document.querySelector('.map__pin--main');

  var getCoordinatsFromPosition = function (position) {
    return {
      x: Math.floor(position.x + MAIN_PIN_WIDTH / 2),
      y: Math.floor(position.y + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT)
    };
  };

  var onElementActive = function (position) {
    mainPinActived(getCoordinatsFromPosition(position));
  };

  var mainPinValidPosition = {
    minX: window.pinsArea.minX,
    maxX: window.pinsArea.maxX - MAIN_PIN_WIDTH,
    minY: window.pinsArea.minY,
    maxY: window.pinsArea.maxY - MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT
  };

  var mainPinInit = function (onMainPinActive) {
    mainPinActived = onMainPinActive;
  };

  window.dragEndDrop.setDraggin(mainPinElement, mainPinValidPosition, onElementActive);

  window.mainPin = {
    init: mainPinInit,
    getCoordinats: getCoordinatsFromPosition(window.dragEndDrop.getElementPosition())
  };
})();
