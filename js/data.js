'use strict';
(function () {

  var Pin = {
    COUNT: 8,
    WIDTH: 50,
    HEIGHT: 75
  };

  var Price = {
    MIN: 1000,
    MAX: 1000000
  };

  var Guests = {
    MIN: 1,
    MAX: 100
  };

  var Rooms = {
    MIN: 1,
    MAX: 5
  };

  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var getAvatar = function (i) {
    return 'img/avatars/user0' + ++i + '.png';
  };

  var getTitle = function (i) {
    return window.util.getMixArray(TITLES)[i];
  };

  var getFeatures = function () {
    return window.util.getClipArray(window.util.getMixArray(FEATURES), window.util.getRandomInt(0, FEATURES.length));
  };

  var getPins = function () {
    var arr = [];
    for (var i = 0; i < Pin.COUNT; i++) {
      var x = window.util.getRandomInt(window.pinsArea.minX + Pin.WIDTH / 2, window.pinsArea.maxX - Pin.WIDTH / 2);
      var y = window.util.getRandomInt(window.pinsArea.minY, window.pinsArea.maxY - Pin.HEIGHT);

      arr[i] = {
        author: {
          avatar: getAvatar(i),
        },

        offer: {
          title: getTitle(i),
          address: x + ',' + y,
          price: window.util.getRandomInt(Price.MIN, Price.MAX),
          type: TYPES[window.util.getRandomInt(0, TYPES.length - 1)],
          rooms: window.util.getRandomInt(Rooms.MIN, Rooms.MAX),
          guests: window.util.getRandomInt(Guests.MIN, Guests.MAX),
          checkin: CHECK[window.util.getRandomInt(0, CHECK.length - 1)],
          checkout: CHECK[window.util.getRandomInt(0, CHECK.length - 1)],
          features: getFeatures(),
          description: '',
          photos: window.util.getMixArray(PHOTOS),
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
