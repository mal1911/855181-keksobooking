'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 75;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER_HEIGHT = 22;
var PINS_COUNT = 8;

var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;

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
var ENTER_KEYCODE = 13;

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
  return {
    x: Math.floor(parseInt(element.style.left, 10) + MAIN_PIN_WIDTH / 2),
    y: Math.floor(parseInt(element.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT)
  };
};

var removeChildElements = function (element) {
  if (element) {
    element.innerHTML = '';
  }
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
  pinElement.tabIndex = '0';
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

var isShowPins = function () {
  return mapElement.querySelector('.map__pin:not(.map__pin--main)');
};

var showPins = function () {
  var pinListElement = mapElement.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  addChildElements(pins, pinListElement, pinTemplate, getPinElement);
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

var formElement = document.querySelector('.ad-form');

var isFormEnabled = function () {
  return !formElement.classList.contains('ad-form--disabled');
};

var formDisable = function () {
  if (isFormEnabled()) {
    formElement.classList.add('ad-form--disabled');
  }
  var fieldsets = formElement.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
};

var formEnable = function () {
  if (!isFormEnabled()) {
    formElement.classList.remove('ad-form--disabled');
  }
  var fieldsets = formElement.querySelectorAll('fieldset');
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
  formElement.querySelector('#address').value = location.x + ',' + location.y;
};

pinMainElement.addEventListener('click', function () {
  activatePage();
});

var getIndexElement = function (element) {
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
  var oldActiveElememt = mapElement.querySelector('.map__pin--active');
  if (oldActiveElememt) {
    oldActiveElememt.classList.remove('map__pin--active');
  }
  element.classList.add('map__pin--active');
};

var activatePin = function (element) {
  element = element.closest('.map__pin:not(.map__pin--main)');
  if (element) {
    setActivePin(element);
    openCard(getIndexElement(element));
  }
};

mapElement.addEventListener('click', function (evt) {
  activatePin(evt.target);
});

mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePin(evt.target);
  }
});

// Валидация
var inputElements = formElement.querySelectorAll('input');
var typeElement = formElement.querySelector('#type');
var priceElement = formElement.querySelector('#price');
var timeinElement = formElement.querySelector('#timein');
var timeoutElement = formElement.querySelector('#timeout');
var roomNumberElement = formElement.querySelector('#room_number');
var capacityElement = formElement.querySelector('#capacity');

var setCustomValidity = function (evt) {
  var element = evt.target;
  if (element.validity.tooShort) {
    element.setCustomValidity('Мало символов.');
  } else if (element.validity.tooLong) {
    element.setCustomValidity('Много символов.');
  } else if (element.validity.valueMissing) {
    element.setCustomValidity('Вообще не ввели.');
  } else if (element.validity.rangeUnderflow) {
    element.setCustomValidity('Меньше минимального.');
  } else if (element.validity.rangeOverflow) {
    element.setCustomValidity('Больше минимального.');
  } else {
    element.setCustomValidity('');
  }

};

var setPriceElementMinValue = function (value) {
  var price = PRICE_BUNGALO;
  switch (value) {
    case 'bungalo':
      break;
    case 'flat':
      price = PRICE_FLAT;
      break;
    case 'house':
      price = PRICE_HOUSE;
      break;
    case 'palace':
      price = PRICE_PALACE;
      break;
  }
  priceElement.setAttribute('min', price);
  priceElement.setAttribute('placeholder', price);
  priceElement.checkValidity();
};

var onTypeChange = function (evt) {
  setPriceElementMinValue(evt.target.value);
};

typeElement.addEventListener('change', onTypeChange);

var timeSynchronization = function (sourceElement, recipientElement) {
  recipientElement.value = sourceElement.value;
};

timeinElement.addEventListener('change', function (evt) {
  timeSynchronization(evt.target, timeoutElement);
});

timeoutElement.addEventListener('change', function (evt) {
  timeSynchronization(evt.target, timeinElement);
});

var getCapacityRule = function (value) {
  var rule = [];
  switch (value) {
    case '1':
      rule = [1];
      break;
    case '2':
      rule = [1, 2];
      break;
    case '3':
      rule = [1, 2, 3];
      break;
    case '100':
      rule = [0];
      break;
  }
  return rule;
};

var getCapacityInvalidMessage = function (value) {
  var message = 'Выберете количество гостей из перечня: ';
  var rule = getCapacityRule(value);
  for (var i = 0; i < rule.length; i++) {
    message += ' ' + capacityElement.querySelector('option[value="' + rule[i] + '"]').textContent + ';';
  }
  message = message.substring(0, message.length - 1) + '.';
  return message;
};

var isCapacityValid = function (value, rule) {
  var result = false;
  if (rule.indexOf(parseInt(value, 10)) !== -1) {
    result = true;
  }
  return result;
};

var setCapacityValues = function (element) {
  var elements = capacityElement.querySelectorAll('option');
  var rule = getCapacityRule(element.value);
  for (var i = 0; i < elements.length; i++) {
    if (isCapacityValid(elements[i].value, rule)) {
      elements[i].style.display = 'inline';
    } else {
      elements[i].style.display = 'none';
    }
  }
  setCapacityCustomValidate(capacityElement);
};

var setCapacityCustomValidate = function (element) {
  var value = element.value;
  var rule = getCapacityRule(roomNumberElement.value);
  if (!isCapacityValid(value, rule)) {
    element.setCustomValidity(getCapacityInvalidMessage(roomNumberElement.value));
  } else {
    element.setCustomValidity('');
  }
};

roomNumberElement.addEventListener('change', function (evt) {
  setCapacityValues(evt.target);
});

capacityElement.addEventListener('change', function (evt) {
  setCapacityCustomValidate(evt.target);
});

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener('invalid', function (evt) {
    setCustomValidity(evt);
  });
  inputElements[i].addEventListener('input', function (evt) {
    var element = evt.target;
    element.checkValidity();
  });
}

mapDisable();
formDisable();
setAddress(pinMainElement);
setPriceElementMinValue(typeElement.value);
setCapacityValues(roomNumberElement);
