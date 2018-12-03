'use strict';
(function () {
  var draggingElement;
  //var pinHandle = setup.querySelector('.upload');
  var firstSetupCoords;
  //var draggin = false;


  var onDraggingElement = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    //var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
     // dragged = true;
      //draggin = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      draggingElement.style.top = (draggingElement.offsetTop - shift.y) + 'px';
      draggingElement.style.left = (draggingElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      /*if (dragged) {
        var onClickPreventDefault = function (inputEvt) {
          inputEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }*/
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  var setDraggin = function (element) {
    draggingElement = element;
    draggingElement.addEventListener('mousedown', onDraggingElement);

  };

  window.dragEndDrop = {
    setDraggin: setDraggin
  };

})();
