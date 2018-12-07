'use strict';
(function () {
  var activatePage = function () {
    window.map.enable();
    window.form.enable();
  };

  var deactivatePage = function () {
    window.map.disable();
    window.form.disable();
  };

  var onMainPinActivate = function (coordinats) {
    activatePage();
    window.form.setAddress(coordinats);
  };

  window.map.initialize(onMainPinActivate);
  window.form.setAddress(window.mainPin.getDefaultCoordinats());
  deactivatePage();
})();
