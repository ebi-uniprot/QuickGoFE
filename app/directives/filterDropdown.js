angular
	.module('quickGoFeApp')
	.directive('filterDropdown', ['$http', function($http) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				name: '@',
				active: '@'
			},
			templateUrl: 'directives/filterDropdown.html',
			link: function(scope, attrs) {
			}
		};
	}]);
