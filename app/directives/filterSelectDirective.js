"use strict";
angular.module("quickGoFeApp").directive("filterSelect",
  ['$http', function () {
    return {
      restrict: 'E',
      templateUrl: "directives/filterSelectDirective.html",
      scope: {
        items: '=',
        itemText: '&',
        isTerm: '@'
      },
      link: function ($scope, $element) {
        $element.on('click', function ($event, $element) {
          // Dropdown should not close
          $event.stopPropagation();
        });
      }
    };
  }]);
