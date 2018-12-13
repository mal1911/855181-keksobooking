'use strict';
(function () {

  var addChildElements = function (arr, parentElement, template, getElement, countArg) {
    var fragment = document.createDocumentFragment();
    var count = (countArg && countArg < arr.length) ? countArg : arr.length;
    for (var i = 0; i < count; i++) {
      var element = getElement(arr[i], template);
      if (element) {
        fragment.appendChild(element);
      }
    }
    parentElement.appendChild(fragment);
  };

  var removeChildElements = function (element) {
    if (element) {
      element.innerHTML = '';
    }
  };

  var removeElements = function (elements) {
    if (elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  };

  var getIndexElement = function (element, elements) {
    var indexElement = -1;
    for (var i = 0; i < elements.length; i++) {
      if (element === elements[i]) {
        indexElement = i;
        break;
      }
    }
    return indexElement;
  };

  window.domUtil = {
    addChildElements: addChildElements,
    removeChildElements: removeChildElements,
    removeElements: removeElements,
    getIndexElement: getIndexElement
  };
})();
