'use strict';
(function () {
  var PINS_COUNT = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 75;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 100;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

  var getAvatar = function (i) {
    return 'img/avatars/user0' + ++i + '.png';
  };

  var getTitle = function (i) {
    return getMixArray(TITLES)[i];
  };

  var getFeatures = function () {
    return getClipArray(getMixArray(FEATURES), getRandomInt(0, FEATURES.length));
  };

  var getPins = function () {
    var arr = [];
    for (var i = 0; i < PINS_COUNT; i++) {
      var x = getRandomInt(window.pinsArea.minX + PIN_WIDTH / 2, window.pinsArea.maxX - PIN_WIDTH / 2);
      var y = getRandomInt(window.pinsArea.minY, window.pinsArea.maxY - PIN_HEIGHT);

      arr[i] = {
        author: {
          avatar: getAvatar(i),
        },

        offer: {
          title: getTitle(i),
          address: x + ',' + y,
          price: getRandomInt(MIN_PRICE, MAX_PRICE),
          type: TYPES[getRandomInt(0, TYPES.length - 1)],
          rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
          guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
          checkin: CHECK[getRandomInt(0, CHECK.length - 1)],
          checkout: CHECK[getRandomInt(0, CHECK.length - 1)],
          features: getFeatures(),
          description: '',
          photos: getMixArray(PHOTOS),
        },

        location: {
          x: x,
          y: y
        }
      };
    }
    return arr;
  };

  window.data = {
    getPins: getPins
  };
})();
