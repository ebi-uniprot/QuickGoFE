'use strict';

/**
 * @ngdoc overview
 * @name quickGoFeApp
 * @description
 * # quickGoFeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('quickGoFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'quickGoFeApp.services'
  ]);

  app.config(function ($routeProvider) {
        console.log($routeProvider);
    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .when('/annotations', {
        templateUrl: 'views/annotationList.html',
        controller: 'AnnotationListCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.controller('StartCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});

//app.controller('AnnotationListCtrl',['$scope', 'annotations',
//        function ($scope, annotations) {
//            $scope.annotations = annotations;
//        }]);

//app.controller('AnnotationListCtrl', ['$scope', 'Annotation', function($scope, Annotation) {
//    $scope.annotations = Annotation.query();
//}]);

app.controller('AnnotationListCtrl', function($scope) {
        $scope.annotations = [
    {'Gene_product_id' : 'A0A001',
                'Symbol' : 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''},
    {'Gene_product_id' : 'A0A002',
                'Symbol': 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''},
    {'Gene_product_id' : 'A0A003',
                'Symbol': 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''}];

        $scope.
    });
