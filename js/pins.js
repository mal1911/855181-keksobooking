'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 75;
  var pins;
  var mapElement = document.querySelector('.map');

  var getPositionFromPinCoordinats = function (coordinats) {
    return {x: coordinats.x - PIN_WIDTH / 2, y: coordinats.y - PIN_HEIGHT};
  };

  var isShow = function () {
    return mapElement.querySelector('.map__pin:not(.map__pin--main)');
  };

  var getPinElement = function (pin, template) {
    var pinElement = template.cloneNode(true);
    var location = getPositionFromPinCoordinats(pin.location);
    pinElement.style.left = location.x + 'px';
    pinElement.style.top = location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.tabIndex = '0';
    return pinElement;
  };

  var show = function () {
    var successHandler = function (arr) {
      pins = arr;
      var pinListElement = mapElement.querySelector('.map__pins');
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      window.domUtil.addChildElements(pins, pinListElement, pinTemplate, getPinElement);
    };

    var errorHandler = function (errorMessage) {
      window.errorMessage.show(errorMessage);
    };

    if (!isShow()) {
      window.backend.load(window.url.LOAD, successHandler, errorHandler);
    }
  };

  var setActivePin = function (element) {
    var oldActiveElememt = mapElement.querySelector('.map__pin--active');
    if (oldActiveElememt) {
      oldActiveElememt.classList.remove('map__pin--active');
    }
    element.classList.add('map__pin--active');
  };

  var activatePin = function (element, onActivatePin) {
    element = element.closest('.map__pin:not(.map__pin--main)');
    var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (element) {
      setActivePin(element);
      onActivatePin(pins[window.domUtil.getIndexElement(element, pinElements)]);
    }
  };


//  var pins = window.data.getPins();

  window.pins = {
    show: show,
    activatePin: activatePin
  };
})();
