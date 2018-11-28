'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER_HEIGHT = 22;
var PINS_COUNT = 8;

var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 100;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var ESC_KEYCODE = 27;


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

// пересчитаем координаты в left top
var getPositionFromPinCoordinats = function (location) {
  return {x: location.x - PIN_WIDTH / 2, y: location.y - PIN_HEIGHT};
};

// из left top
var getMainPinCoordinatsFromPosition = function (element) {
  return {x: Math.floor(parseInt(element.style.left, 10) + MAIN_PIN_WIDTH / 2), y: Math.floor(parseInt(element.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT)};
};

var removeChildElements = function (node) {
  node.innerHTML = '';
};

var addChildElements = function (arr, parentElement, template, getElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(getElement(arr[i], template));
  }
  parentElement.appendChild(fragment);
};

var getPinElement = function (pin, template) {
  var pinElement = template.cloneNode(true);
  var location = getPositionFromPinCoordinats(pin.location);
  pinElement.style.left = location.x + 'px';
  pinElement.style.top = location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var getPhotoElement = function (photo, template) {
  var photoElement = template.cloneNode(true);
  photoElement.src = photo;
  return photoElement;
};

var getFeatureElement = function (feature, template) {
  var featureElement = template.cloneNode(true);
  featureElement.classList.add('popup__feature--' + feature);
  return featureElement;
};

var getCardElement = function (pin, template) {
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
  removeChildElements(featureListElement);
  addChildElements(pin.offer.features, featureListElement, featureTemplate, getFeatureElement);

  cardElement.querySelector('.popup__description').textContent = pin.offer.description;

  var photoListElement = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardElement.querySelector('.popup__photo');
  removeChildElements(photoListElement);
  addChildElements(pin.offer.photos, photoListElement, photoTemplate, getPhotoElement);

  cardElement.querySelector('img').src = pin.author.avatar;

  return cardElement;
};

var getPins = function (pinsCount) {
  var arr = [];
  for (var i = 0; i < pinsCount; i++) {
    var x = getRandomInt(MIN_X + PIN_WIDTH / 2, MAX_X - PIN_WIDTH / 2);
    var y = getRandomInt(MIN_Y, MAX_Y - PIN_HEIGHT);

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

var pins = getPins(PINS_COUNT);
var mapElement = document.querySelector('.map');

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

var closeCard = function () {
  var deletedElement = mapElement.querySelector('.map__card');
  if (deletedElement) {
    document.removeEventListener('keydown', onEscPress);
    deletedElement.remove();
  }
};

var openCard = function (indexElement) {
  closeCard();
  var mapFiltersContainer = mapElement.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = getCardElement(pins[indexElement], cardTemplate);
  mapElement.insertBefore(cardElement, mapFiltersContainer);
  document.addEventListener('keydown', onEscPress);
  cardElement.querySelector('.popup__close').addEventListener('click', closeCard);
};

var flagShowPins = false;

var isShowPins = function () {
  return flagShowPins;
};

var showPins = function () {
  var pinListElement = mapElement.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  addChildElements(pins, pinListElement, pinTemplate, getPinElement);
  flagShowPins = true;
};

var mapEnable = function () {
  if (mapElement.classList.contains('map--faded')) {
    mapElement.classList.remove('map--faded');
  }
};

var mapDisable = function () {
  if (!mapElement.classList.contains('map--faded')) {
    mapElement.classList.add('map--faded');
  }
};

var form = document.querySelector('.ad-form');

var isFormEnabled = function () {
  return !form.classList.contains('ad-form--disabled');
};

var formDisable = function () {
  if (isFormEnabled()) {
    form.classList.add('ad-form--disabled');
  }
  var fieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
};

var formEnable = function () {
  if (!isFormEnabled()) {
    form.classList.remove('ad-form--disabled');
  }
  var fieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
};

// map .map__pin--main.
var pinMainElement = document.querySelector('.map__pin--main');

var activatePage = function () {
  if (!isShowPins()) {
    showPins();
  }
  mapEnable();
  formEnable();
};

var setAddress = function (element) {
  var location = getMainPinCoordinatsFromPosition(element);
  form.querySelector('#address').value = location.x + ',' + location.y;
};

pinMainElement.addEventListener('click', function () {
  activatePage();
});

var isPinNotMain = function (element) {
  return element.classList.contains('map__pin') && !element.classList.contains('map__pin--main');
};

var getIndexFormElement = function (element) {
  var indexElement;
  var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinElements.length; i++) {
    if (element === pinElements[i]) {
      indexElement = i;
      break;
    }
  }
  return indexElement;
};

var setActivePin = function (element) {
  var pinElements = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].classList.remove('.map__pin--active');
  }
  element.classList.add('.map__pin--active');
};

var activatePin = function (element) {
  if (isPinNotMain(element)) {
    setActivePin(element);
    openCard(getIndexFormElement(element));
  }
};

mapElement.addEventListener('click', function (evt) {
  activatePin(evt.target);
});

mapDisable();
formDisable();
setAddress(pinMainElement);
