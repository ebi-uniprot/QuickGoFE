angular
	.module('quickGoFeApp')
	.directive('megasearch', ['$q', '$timeout', 'searchService', '$location',
		function($q, $timeout, searchService, $location) {
		return {
			restrict: 'AEC',
			scope: {
				searchTerm: '=',
				noInput: '=?',
				limit: '@'
			},
			link: function(scope, elem, attrs) {
				scope.provideSuggestions = function(keyCode) {
					$timeout.cancel(scope.timePromise); //cancel previous request

					if(keyCode === 27) {
						reset();
					} else if(keyCode === 13) {
						scope.submitSearch();
					} else if(!scope.searchTerm || scope.searchTerm.length <3){
						return;
					}

					scope.timePromise = $timeout(function() {
						loadData();
					} ,500);
				}

				scope.submitSearch = function() {
				    $location.path("/search/" + scope.searchTerm);
				}

				var loadData = function() {
					//Look for matching GO terms
					scope.goTermsPromise = searchService.findTerms(scope.searchTerm, scope.limit);
					scope.goTermsPromise.then(function(res) {
						scope.terms = res.data;
					});

					//Look for Gene Products
					scope.gpPromise = searchService.findGeneProducts(scope.searchTerm, scope.limit);
					scope.gpPromise.then(function(res) {
						scope.products = res.data;
					});
					//Look for Publications					
				}

				var reset = function() {
					scope.searchTerm = '';
					scope.terms = [];
					scope.products = [];
				}

				window.onclick = function() {
					if(!scope.noInput) {
						reset();
						scope.$apply();
					}
				}

				if(scope.noInput) {
					loadData();
				}

			},
			templateUrl: 'directives/megasearch.html'
		};
	}]);