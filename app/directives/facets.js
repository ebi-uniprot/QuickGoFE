angular
	.module('quickGoFeApp')
	.directive('facets', ['$http', function($http) {
		return {
			restrict: 'E',
			scope: {
				searchTerm: '=',
				endpoint: '@',
				fields: '=',
				filters: '='
			},
			templateUrl: 'directives/facets.html',
			link: function($scope, iElm, iAttrs, controller) {

				console.log($scope.searchTerm);

			  $scope.getFilterUrl = function(field, category) {
			    return  (($scope.filters && $scope.filters.length > 0) ? $scope.filters + ',' : '') + field + ':' + category;
			  }

			  $scope.isSelected = function(field, category) {
			    return $scope.filters.indexOf(field + ':' + category) > -1;
			  }
  			}
		};
	}]);