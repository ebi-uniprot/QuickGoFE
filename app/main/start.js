'use strict';
angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $rootScope, informationService) {

  $rootScope.header = 'QuickGO Beta';

  informationService.getGoReleaseInfo().then(function(d){
    $scope.goReleaseInfo = d.data.go;
  });

  informationService.getAnnotationReleaseInfo().then(function(d){
    console.log(d);
    $scope.annotationReleaseInfo = d.data.annotation;
  });

});
