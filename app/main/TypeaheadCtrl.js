/**
 * Created by twardell on 06/07/2015.
 */

angular.module('quickGoFeApp').controller('TypeaheadCtrl', function ($scope, $http, filteringService,
                                            $location, ENV, searchService) {

  $scope.searchText='';

  $scope.provideSuggestions = function(val) {

    var limit = 10;

    $scope.searchTerm = val;

    //Look for matching GO terms
    $scope.goTermsPromise = searchService.findTerms(val, limit);
    $scope.goTermsPromise.then(function(res){
      $scope.terms = res.data.go;
    });


    //Look for Gene Products
    $scope.gpPromise = searchService.findGeneProducts(val, limit);
    $scope.gpPromise.then(function(res){
      $scope.products = res.data.protein;
    });
  };

  /**
   * Forward to the search result page.
   * @param searchTerm
   */
  $scope.showSearchResults = function (searchTerm) {
    $location.path("/megasearch/"+searchTerm);  
  };
});
