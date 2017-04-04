'use strict';
angular
  .module('quickGoFeApp')
  .directive('addFading', ['$rootScope', function($rootScope) {
    return function(scope, element) {
      $rootScope.fadeAlert(angular.element(element));
    };
  }]);
