'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var PINS_COUNT = 8;
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

// пересчитаем координаты
var getPinCoordinats = function (location) {
  return {x: location.x + PIN_WIDTH / 2, y: location.y + PIN_HEIGHT};
};

var removeChilds = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

var addChildElements = function (arr, parentElement, template, renderElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderElement(arr[i], template));
  }
  parentElement.appendChild(fragment);
};

var renderPin = function (pin, template) {
  var pinElement = template.cloneNode(true);
  var location = getPinCoordinats(pin.location);
  pinElement.style.left = location.x + 'px';
  pinElement.style.top = location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var renderPhoto = function (photo, template) {
  var photoElement = template.cloneNode(true);
  photoElement.src = photo;
  return photoElement;
};

var renderFeature = function (feature, template) {
  var featureElement = template.cloneNode(true);
  featureElement.classList.add('popup__feature--' + feature);
  return featureElement;
};

var renderCard = function (pin, template) {
  var cardElement = template.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  var carType = cardElement.querySelector('.popup__type');
  switch (pin.offer.type) {
    case 'flat':
      carType.textContent = 'Квартира';
      break;
    case 'bungalo':
      carType.textContent = 'Бунгало';
      break;
    case 'house':
      carType.textContent = 'Дом';
      break;
    case 'palace':
      carType.textContent = 'Дворец';
      break;
  }
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ',  выезд до ' + pin.offer.checkout;

  var featureListElement = cardElement.querySelector('.popup__features');
  var featureTemplate = cardElement.querySelector('.popup__feature');
  featureTemplate.classList.remove('popup__feature--wifi');
  removeChilds(featureListElement);
  addChildElements(pin.offer.features, featureListElement, featureTemplate, renderFeature);

  cardElement.querySelector('.popup__description').textContent = pin.offer.description;

  var photoListElement = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardElement.querySelector('.popup__photo');
  removeChilds(photoListElement);
  addChildElements(pin.offer.photos, photoListElement, photoTemplate, renderPhoto);

  cardElement.querySelector('img').src = pin.author.avatar;

  return cardElement;
};

var getPins = function (pinsCount) {
  var arr = [];
  for (var i = 0; i < pinsCount; i++) {
    var x = getRandomInt(0, 900);
    var y = getRandomInt(130, 630);

    arr[i] = {
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
  return arr;
}

var pins = getPins(PINS_COUNT);

var mapBlock = document.querySelector('.map');

var pinListElement = mapBlock.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
addChildElements(pins, pinListElement, pinTemplate, renderPin);

var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
mapBlock.insertBefore(renderCard(pins[0], cardTemplate), mapFiltersContainer);

mapBlock.classList.remove('map--faded');
