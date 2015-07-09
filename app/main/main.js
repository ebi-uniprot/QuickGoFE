'use strict';

/**
 * @ngdoc function
 * @name quickGoFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quickGoFeApp
 */
angular.module('quickGoFeApp')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
