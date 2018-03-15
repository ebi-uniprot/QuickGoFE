'use strict';
angular
  .module('quickGoFeApp')
  .directive('chart', ['$http', 'chartService', '$modal', function($http, chartService) {
    return {
      restrict: 'E',
      scope: {
        ids: '=',
        full: '=?',
      },
      templateUrl: 'directives/chart.html',
      link: function(scope) {
        scope.showKey = true;
        scope.showIds = true;
        scope.termBoxWidth = 85;
        scope.termBoxHeight = 55;
        scope.showSlimColours = false;
        scope.showChildren = false;

        var that = this;
        scope.$watchGroup(['showIds','showKey','termBoxWidth','termBoxHeight','showSlimColours','showChildren'], function(d){
          that.drawChart(scope);
        });
        this.drawChart(scope);
      },
      drawChart: function(scope) {
        if(!scope.termBoxHeight)
          return;
        if(!scope.termBoxWidth)
          return;
        var chartPromise = chartService.getChart(scope.ids, scope.showIds, scope.showKey, scope.termBoxWidth, scope.termBoxHeight, scope.showSlimColours, scope.showChildren);
        var imageMapPromise = chartService.getChart(scope.ids, scope.showIds, scope.showKey, scope.termBoxWidth, scope.termBoxHeight, scope.showSlimColours, scope.showChildren, true);
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
