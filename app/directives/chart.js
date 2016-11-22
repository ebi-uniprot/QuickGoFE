'use strict';
angular
  .module('quickGoFeApp')
  .directive('chartIcon', ['$http', 'chartService', '$modal', function($http, chartService, $modal) {
    return {
      restrict: 'E',
      scope: {
        ids: '='
      },
      template: '<span ng-click="showChart()" class="chart-btn selectable" data-icon="h"></span>',
      link: function(scope) {
        scope.showChart = function() {
          $modal.open({
            templateUrl: 'modals/chartTemplate.html',
            size:'large',
            resolve: {
              ids: function() {
                return scope.ids;
              },
            },
            controller: function($scope, $modalInstance, ids) {
              var chartPromise, imageMapPromise;

              if (ids.lastIndexOf('GO:') === 0) {
                chartPromise = chartService.getGOChart(ids);
                imageMapPromise = chartService.getGOImageMap(ids);
              } else {
                chartPromise = chartService.getECOChart(ids);
                imageMapPromise = chartService.getECOImageMap(ids);
              }

              chartPromise.then(function(d) {
                $scope.img = d.data;
              });

              imageMapPromise.then(function(d) {
                console.log(d);
                $scope.title = d.data.title;
                $scope.graphImage = d.data;
                $scope.imageMapId = 'chart_' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
                $scope.imageWidth = d.data.imageWidth;
                $scope.imageHeight = d.data.imageHeight;
              });

              $scope.ok = function() {
                $modalInstance.close();
              };
            }
          });
        };
      }
    };
  }]);
