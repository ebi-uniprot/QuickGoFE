angular
	.module('quickGoFeApp')
	.directive('chartIcon', ['$http','chartService', function($http, chartService) {
		return {
			restrict: 'E',
			scope: {
				ids: '='
			},
			templateUrl: 'directives/chart.html',
			link: function(scope) {
        scope.showGraph = false;
        scope.showChart = function() {
        //TODO check if GO or ECO 
          var chartPromise = chartService.getGOChart(scope.ids);
            
          chartPromise.then(function(d){
            scope.img = d.data;
            
            //TODO use a modal when moved to Foundation
            scope.showGraph = true;
          });
          
//          chartService.getGOImageMap(scope.ids).then(function(d){console.log(d)});
        }
			}
		};
	}]);