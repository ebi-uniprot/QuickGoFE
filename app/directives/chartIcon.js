'use strict';

angular
  .module('quickGoFeApp')
  .directive('chartIcon', ['$http', '$modal', function($http, $modal) {
    return {
      restrict: 'E',
      scope: {
        ids: '@'
      },
      template: '<span ng-click="showChart()" class="chart-btn selectable" data-icon="h"></span>',
      link: function(scope) {
        scope.showChart = function() {
          $modal.open({
            templateUrl: 'directives/chartIcon.html',
            size:'large',
            resolve: {
              ids: function() {
                return scope.ids;
              }
            },
            controller: function($scope, $modalInstance, ids) {      
              $scope.ids = ids;
              $scope.ok = function() {
                $modalInstance.close();
              };
            }
          });
        };
      }
    };
  }]);
