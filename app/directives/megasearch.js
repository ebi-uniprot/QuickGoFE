'use strict';
angular
	.module('quickGoFeApp')
	.directive('megasearch', ['$q', '$timeout', 'searchService', '$location', '$document', 'ontoTypeService',
		function($q, $timeout, searchService, $location, $document, ontoTypeService) {
		return {
			restrict: 'AEC',
			scope: {
				searchTerm: '=?',
				noInput: '=?',
				limit: '@',
			},
			link: function(scope, elem) {
				scope.advancedSearchVisible = false;
				// this holds a default empty record, so the advanced search
				// won't be empty once it's open
				scope.advancedQueryDataset = [{
					term: null,
					condition: null  // condition can be null, since first row doesn't require any conditions
				}];

				scope.provideSuggestions = function(keyCode) {

					// size the mega search box to match the input field
					if($location.path()==='/'){
						angular.element($document[0].querySelector('#search-terms #megasearchbox')).width(angular.element($document[0].querySelector('#search-terms #searchbox')).width()-18);
					}else{
						angular.element($document[0].querySelector('#megasearchbox')).width(angular.element($document[0].querySelector('#searchbox')).width()-18);
					}

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
				};

				scope.submitSearch = function() {
				    $location.path('search/' + scope.searchTerm);
				};

				scope.isGoTerm = function(termId) {
					return ontoTypeService.isGoTerm(termId);
				};

				function advancedQueryLineBuilder(index) {
					// adding an empty row. AND is selected by default.
					scope.advancedQueryDataset
						.push({
							term: null,
							condition: 'AND'
						});
				}

				scope.toggleToAdvancedSearch = function() {
					var box = angular.element($document[0].querySelector('#search-terms #advancedsearchbox'));
					scope.advancedSearchVisible = !scope.advancedSearchVisible;
				};

				scope.addAdvancedQueryItem = function() {
					var index = scope.advancedQueryDataset.length;
					advancedQueryLineBuilder(index);
				}

				scope.removeAdvancedQueryItem = function(index) {
					scope.advancedQueryDataset.splice(index, 1);
				}

				scope.performAdvancedSearch = function() {
					var payload = {
						"and": {
					    "goTerms": [],
					  },
					  "not": {
					    "goTerms": [],
					  }
					};

					scope.advancedQueryDataset
						.forEach(function (line, index) {
							// first item goes to the AND clause.
							if (index === 0) {
								payload.and.goTerms.push(line.term);
							} else if (line.condition === 'AND') {
								payload.and.goTerms.push(line.term)
							} else if (line.condition === 'NOT') {
								payload.not.goTerms.push(line.term);
							}
						});

					searchService.advancedSearch(payload)
						.then(function(results) {
							console.log("advanced search results:", results);
							scope.goList = results.data;
	            scope.annotations = results.data.results;
	            scope.totalItems = results.data.numberOfHits;
						})
						.catch(function(err) {
							console.log("advanced search failed:", err);
						});
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
				};

				var reset = function() {
					scope.searchTerm = '';
					scope.terms = [];
					scope.products = [];
				};

				//Only close on click if it's open in a panel
				if (!scope.noInput) {
					$document.bind('click', function(event) {
						var isAnchor = event.target.localName === 'a';

						var isClickedElementChildOfPopup = elem[0]
							.contains(event.target);

						if (isClickedElementChildOfPopup && !isAnchor) {
							return;
						}

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
