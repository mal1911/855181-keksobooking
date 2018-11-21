'use strict';

var SIMILAR_DECLARATIONS_COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var similarDeclarations = new Array();


var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getMixArray = function (arr) {
  return arr.sort(function () {
    return 0.5 - Math.random();
  }).slice();
};

var getClipArray = function (arr, count) {
  arr.length -= count;
  return arr;
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

for (var i = 0; i < SIMILAR_DECLARATIONS_COUNT; i++) {
  var x = getRandomInt(0, 1200);
  var y = getRandomInt(130, 630);

  similarDeclarations[i] = {
    author: {
      avatar: getAvatar(i),
    },

    offer: {
      title: getTitle(i),
      address: x + ',' + y,
      price: getRandomInt(1000, 1000000),
      type: TYPES[getRandomInt(0, TYPES.length - 1)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 100),
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

console.log(similarDeclarations);
