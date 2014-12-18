/**
 * Created by twardell on 17/12/2014.
 */
'use strict';

/**
 * @ngdoc function
 * @name quickGoFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the quickGoFeApp
 */
var app = angular.module('quickGoFeApp')
    .controller('AnnotationListCtrl',['$scope', 'annotations',
        function ($scope, annotations) {
            $scope.annotations = annotations;
        }]);

app.controller('StartCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});
