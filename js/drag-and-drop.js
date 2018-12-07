'use strict';
(function () {
  var draggingElement;
  var activateElement;
  var currentPosition;
  var defaultPosition;
  var validArea;

  var isValidPisition = function (position) {
    return (position.x >= validArea.minX && position.x <= validArea.maxX
      && position.y >= validArea.minY && position.y <= validArea.maxY);
  };

  var getElementPosition = function () {
    return {
      x: Math.floor(parseInt(draggingElement.style.left, 10)),
      y: Math.floor(parseInt(draggingElement.style.top, 10))
    };
  };

  var onDraggingElement = function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY,
      };
      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var tempPosition = {
        x: draggingElement.offsetLeft - shift.x,
        y: draggingElement.offsetTop - shift.y
      };

      if (isValidPisition(tempPosition)) {
        currentPosition = tempPosition;
        draggingElement.style.left = currentPosition.x + 'px';
        draggingElement.style.top = currentPosition.y + 'px';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      activateElement(currentPosition);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var initialize = function (element, area, onActivateElement) {
    draggingElement = element;
    currentPosition = getElementPosition();
    defaultPosition = currentPosition;
    activateElement = onActivateElement;
    validArea = area;
    draggingElement.addEventListener('mousedown', onDraggingElement);
  };

  var getCurrentPositon = function () {
    return currentPosition;
  };

  var getDefaultPositon = function () {
    return defaultPosition;
  };

  window.dragEndDrop = {
    initialize: initialize,
    getElementPosition: getCurrentPositon,
    getDefaultPositon: getDefaultPositon
  };
})();
