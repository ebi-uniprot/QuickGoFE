'use strict';
angular
  .module('quickGoFeApp')
  .directive('chartIcon', ['$http', 'chartService', function ($http, chartService) {
    return {
      restrict: 'E',
      scope: {
        ids: '=',
        modal: '=?' //default true
      },
      templateUrl: 'directives/chart.html',
      link: function (scope) {
        scope.modal = angular.isDefined(scope.modal) ? scope.modal : true;
        scope.showGraph = !scope.modal;

        scope.showChart = function () {

          var chartPromise, imageMapPromise;

          if(scope.ids.lastIndexOf('GO:') === 0) {
            chartPromise = chartService.getGOChart(scope.ids);
            imageMapPromise = chartService.getGOImageMap(scope.ids);
          } else {
            chartPromise = chartService.getECOChart(scope.ids);
            imageMapPromise = chartService.getECOImageMap(scope.ids);
          }

          chartPromise.then(function (d) {
            scope.img = d.data;
            //TODO use a modal when moved to Foundation
            scope.showGraph = true;
          });
          imageMapPromise.then(function (d) {
            scope.title = d.data.title;
            scope.graphImage = d.data;
            scope.imageMapId =  'chart_' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
          });
        };

        if(scope.showGraph) {
          scope.showChart();
        }

      }
    };
	}]);
