angular
	.module('quickGoFeApp')
	.directive('megasearch', ['$q', '$timeout', 'searchService', function($q, $timeout, searchService) {
		return {
			restrict: 'AEC',
			scope: {
				searchTerm: '=',
				limit: '@'
			},
			link: function(scope, elem, attrs) {

				scope.timePromise;

				scope.provideSuggestions = function(keyCode) {
					$timeout.cancel(scope.timePromise); //cancel previous request

					if(keyCode === 27) {
						reset();
					} else if(!scope.searchTerm || scope.searchTerm.length <3){
						return;
					}

					scope.timePromise = $timeout(function() {
						//Look for matching GO terms
						scope.goTermsPromise = searchService.findTerms(scope.searchTerm, scope.limit);
						scope.goTermsPromise.then(function(res) {
							scope.terms = res.data.go;
						});

						//Look for Gene Products
						scope.gpPromise = searchService.findGeneProducts(scope.searchTerm, scope.limit);
						scope.gpPromise.then(function(res) {
							scope.products = res.data.protein;
						});
						//Look for Publications						
					} ,500);
				}

				var reset = function() {
					scope.searchTerm = '';
					scope.terms = [];
					scope.products = [];
				}

				window.onclick = function() {
					reset();
					scope.$apply();
				}

			},
			templateUrl: 'directives/megasearch.html'
		};
	}]);