'use strict';
angular
  .module('quickGoFeApp')
  .directive('chart', ['$http', 'chartService', '$modal', function($http, chartService) {
    return {
      restrict: 'E',
      scope: {
        ids: '=',
        full: '=?'
      },
      templateUrl: 'directives/chart.html',
      link: function(scope) {
        var imageMapPromise, chartPromise;
        if (scope.ids.lastIndexOf('GO:') >= 0) {
          chartPromise = chartService.getGOChart(scope.ids);
          imageMapPromise = chartService.getGOImageMap(scope.ids);
        } else {
          chartPromise = chartService.getECOChart(scope.ids);
          imageMapPromise = chartService.getECOImageMap(scope.ids);
        }
        chartPromise.then(function(d) {
          scope.img = d.data;
        });
        imageMapPromise.then(function(d) {
          scope.imageMapId = "theMap";
          scope.title = d.data.title;
          scope.graphImage = d.data;
          if(scope.full === true) {
            scope.imageMapId = 'chart_' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
            scope.imageWidth = d.data.imageWidth;
            scope.imageHeight = d.data.imageHeight;
            scope.style = 'max-width:none';
          }
        });
      }
    };
  }]);
