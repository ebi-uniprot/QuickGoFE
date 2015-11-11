/**
 * Created by twardell on 04/06/2015.
 */
app.controller('SearchProductsCtrl', function($scope, $location, $uibModal, searchfull, $routeParams) {


  //This value holds the displayed total for the selected view by value
  $scope.srcTotalNumberResults = 0;

  $scope.maxSize = 25;
  $scope.currentPage = 1;

  $scope.searchTerm = $routeParams.searchTerm;


  getResultsPage(); //<--this is called instead by the page changed call

  $scope.pagination = {
    current: 1
  };

  function getResultsPage() {
    //Now do search for this


    $scope.queryPromise = searchfull.query({
      text: $scope.searchTerm,
      page: $scope.currentPage,
      rows: $scope.resultsPerPage,
      viewBy: 'entity'
    }).$promise;
    $scope.queryPromise.then(
      function(result) {
        $scope.matches = [];
        $scope.x = result;
        console.log($scope.x);
        $scope.srcTotalNumberResults = $scope.x.totalNumberResults;
      });
  }



  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function() {
    getResultsPage();
  };



  $scope.highlight = function(text) {
    if (!text) {
      return text;
    }
    var newText = text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
    return newText;
  }


});