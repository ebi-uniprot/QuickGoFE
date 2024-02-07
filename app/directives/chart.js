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
        scope.originalTermBoxWidth = 120;
        scope.originalTermBoxHeight = 65;
        scope.originalFontSize = 11;
        scope.termBoxWidth = scope.originalTermBoxWidth;
        scope.termBoxHeight = scope.originalTermBoxHeight;
        scope.fontSize = scope.originalFontSize;
        scope.showSlimColours = false;
        scope.showChildren = false;

        var that = this;

        scope.applyOptions = function() {
          that.drawChart(scope);
        };

        scope.multiplyChartSizeItems = [
          { name: "Default - normal", value: 1 },
          { name: "2X - double", value: 2 },
          { name: "3X - triple", value: 3 },
          { name: "4X - quadruple", value: 4 },
        ];

        scope.multiplyChartSize = function(selectedItem) {
          var size = selectedItem.value;

          if (!size) {
            return;
          }

          scope.termBoxWidth = scope.originalTermBoxWidth * size;
          scope.termBoxHeight = scope.originalTermBoxHeight * size;
          scope.fontSize = scope.originalFontSize * size;
        }

        scope.downloadChart = function() {
          if (!scope.termBoxHeight) {
            return;
          }

          if (!scope.termBoxWidth) {
            return;
          }

          // Requesting a larger chart from the service
          var chartPromise = chartService.getChart(
            scope.ids,
            scope.showIds,
            scope.showKey,
            Math.round(scope.termBoxWidth * 2.5),
            Math.round(scope.termBoxHeight * 2.5),
            Math.round(scope.fontSize * 2.5),
            scope.showSlimColours,
            scope.showChildren
          );

          chartPromise.then(function(d) {
            var a = document.createElement("a");
            a.href = "data:image/png;base64," + d.data;
            a.download = scope.title + ".png";
            a.click();
          });
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
