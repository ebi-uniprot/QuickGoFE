'use strict';
angular
	.module('quickGoFeApp')
	.directive('filterDropdown', ['$http', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				name: '@',
				active: '@'
			},
			templateUrl: 'directives/filterDropdown.html',
			link: function() {
			}
		};
	}]);
