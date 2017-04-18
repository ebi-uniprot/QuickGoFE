'use strict';
angular
  .module('quickGoFeApp')
  .directive('addFading', function() {
    return function(scope, element) {
      setTimeout(function(){
        angular.element(element).fadeOut('slow');
      }, 5000);
    };
  });
