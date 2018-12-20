'use strict';
(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_HEIGHT: 22
  };

  var mainPinElement = document.querySelector('.map__pin--main');

  var getCoordinatsFromPosition = function (position) {
    return {
      x: Math.floor(position.x + MainPin.WIDTH / 2),
      y: Math.floor(position.y + MainPin.HEIGHT + MainPin.POINTER_HEIGHT)
    };
  };

  var getDefaultCoordinats = function () {
    return getCoordinatsFromPosition(window.dragEndDrop.getDefaultPosition());
  };

  var mainPinValidPosition = {
    minX: window.pinsArea.minX,
    maxX: window.pinsArea.maxX - MainPin.WIDTH,
    minY: window.pinsArea.minY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT),
    maxY: window.pinsArea.maxY - (MainPin.HEIGHT + MainPin.POINTER_HEIGHT)
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
    getDefaultCoordinats: getDefaultCoordinats
  };
})();
