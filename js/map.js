var SIMILAR_DECLARATIONS_COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var similarDeclaration;
var similarDeclarations = new Array();


var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');


var getAvatar = function (i) {
  return 'img/avatars/user0' + ++i + '.png';
}

var getPhotos = function (arr) {
  return arr.sort(function () {
    return 0.5 - Math.random();
  }).slice();
}

for (var i = 0; i < SIMILAR_DECLARATIONS_COUNT; i++) {
  similarDeclaration = {
    author: {
      avatar: getAvatar(i),
    },

    offer: {
      title: TITLES[i],
      address: '500,600',
      price: 1000,
      type: '',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '12:00',
      features: 'wifi',
      description: '',
      photos: getPhotos(PHOTOS),
    },

    location: {
      x: 130,
      y: 630,
    }
  }
  similarDeclarations[i] = similarDeclaration;
}

console.log(similarDeclarations);


/*var similarAds = [
  {
    author: {
      avatar: '',
    },

    offer: {
      title: '',
      address: '500,600',
      price: 1000,
      type: '',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '12:00',
      features: 'wifi',
      description: '',
      photos: '',
    },

    location: {
      x: 130,
      y: 630,
    }
  },
];

*/

/*
{
  name: WIZARD_NAMES[1],
  coatColor: 'rgb(215, 210, 55)'
},
{
  name: WIZARD_NAMES[2],
  coatColor: 'rgb(101, 137, 164)'
},
{
  name: WIZARD_NAMES[3],
  coatColor: 'rgb(127, 127, 127)'
}*/

/*
{
  "author": {
  "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
},

  "offer": {
  "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
  "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
  "price": число, случайная цена от 1000 до 1 000 000
  "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  "rooms": число, случайное количество комнат от 1 до 5
  "guests": число, случайное количество гостей, которое можно разместить
  "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    "description": пустая строка,
    "photos": массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
},

  "location": {
«x»: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    «y»: случайное число, координата y метки на карте от 130 до 630.
}
}
*/
