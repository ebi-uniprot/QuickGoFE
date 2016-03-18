angular
	.module('quickGoFeApp')
	.directive('megasearch', ['$q', '$timeout', 'searchService', '$location', '$document',
		function($q, $timeout, searchService, $location, $document) {
		return {
			restrict: 'AEC',
			scope: {
				searchTerm: '=?',
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
					}

					scope.timePromise = $timeout(function() {
					if(scope.searchTerm || scope.searchTerm.length >= 3){
							loadData();
						}
					} ,500);
				}

				scope.submitSearch = function() {
				    $location.path("search/" + scope.searchTerm);
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

				//Only close on click if it's open in a panel
				if (!scope.noInput) {
					$document.bind('click', function(event) {
						var isAnchor = event.target.localName === 'a';

						var isClickedElementChildOfPopup = elem[0]
							.contains(event.target);

						if (isClickedElementChildOfPopup && !isAnchor)
							return;

						reset();
						scope.$apply();
					});
				}


				if(scope.noInput) {
					loadData();
				}

			},
			templateUrl: 'directives/megasearch.html'
		};
	}]);
