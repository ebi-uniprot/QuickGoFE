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
        scope.fontSize = 11;
        scope.showSlimColours = false;
        scope.showChildren = false;

        var that = this;

        scope.applyOptions = function() {
          scope.originalChartSizeValues = null;
          that.drawChart(scope);
        };

        scope.multiplyChartSizeItems = [
          { name: "Do not multiply", value: 1 },
          { name: "Multiply by 2", value: 2 },
          { name: "Multiply by 3", value: 3 },
          { name: "Multiply by 4", value: 4 },
        ];

        scope.originalChartSizeValues = null;

        scope.multiplyChartSize = function(selectedItem) {
          var size = selectedItem.value;

          if (!size) {
            return;
          }

          if (!scope.originalChartSizeValues) {
            scope.originalChartSizeValues = {
              width: scope.termBoxWidth,
              height: scope.termBoxHeight,
              font: scope.fontSize,
            };
          }

          if (size === 1) {
            scope.termBoxWidth = scope.originalChartSizeValues.width;
            scope.termBoxHeight = scope.originalChartSizeValues.height;
            scope.fontSize = scope.originalChartSizeValues.font;
          }

          scope.termBoxWidth *= size;
          scope.termBoxHeight *= size;
          scope.fontSize *= size;
        }

        this.drawChart(scope);
      },
      drawChart: function(scope) {
        if(!scope.termBoxHeight)
          return;
        if(!scope.termBoxWidth)
          return;
        var chartPromise = chartService.getChart(scope.ids, scope.showIds, scope.showKey, scope.termBoxWidth, scope.termBoxHeight, scope.fontSize, scope.showSlimColours, scope.showChildren);
        var imageMapPromise = chartService.getChart(scope.ids, scope.showIds, scope.showKey, scope.termBoxWidth, scope.termBoxHeight, scope.fontSize, scope.showSlimColours, scope.showChildren, true);
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
