'use strict';

/**
 * @ngdoc function
 * @name quickGoFeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quickGoFeApp
 */
angular.module('quickGoFeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
