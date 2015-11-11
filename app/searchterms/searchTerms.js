/**
 * Created by twardell on 04/06/2015.
 */
app.controller('SearchTermsCtrl', function($scope,  $location, $uibModal, searchfull, $routeParams) {


  //This value holds the displayed total for the selected view by value
  $scope.srcTotalNumberResults = 0;

  $scope.maxSize=25;
  $scope.currentPage=1;
  $scope.viewBy = "goID";


  $scope.searchTerm = $routeParams.searchTerm;

  getResultsPage();    //<--this is called instead by the page changed call

  $scope.pagination = {
    current: 1
  };

  function getResultsPage() {
    //Now do search for this


    $scope.queryPromise = searchfull.query({text: $scope.searchTerm, page: $scope.currentPage, rows: $scope.resultsPerPage, viewBy: $scope.viewBy}).$promise;
    $scope.queryPromise.then(
      function (result) {
        $scope.matches = [];

        $scope.x = result;
        //Populate the displayed number of search results
        if($scope.x.viewBy=='goID') {
          $scope.srcTotalNumberResults = $scope.x.goNumberResults;
        }

        if($scope.x.viewBy=='bp') {
          $scope.srcTotalNumberResults = $scope.x.biologicalProcessNumberResults;
        }

        if($scope.x.viewBy=='mf') {
          $scope.srcTotalNumberResults = $scope.x.molecularFunctionNumberResults;
          console.log($scope.x);
        }

        if($scope.x.viewBy=='cc') {
          $scope.srcTotalNumberResults = $scope.x.cellularComponentNumberResults;
        }


    });
  }



  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function() {
    getResultsPage();
  };



  $scope.showResults= function(viewBy) {
    if($scope.viewBy!=viewBy) {
      $scope.viewBy=viewBy
      getResultsPage();
    }
  };


  $scope.highlight = function(text){

    if(!text){
      return text;
    }

  var newText =  text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
    return newText;
  }

  /**
   * --------------------------------------------------- Graph Code --------------------------------------------------
   */

  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showOntologyGraph = function (termId, title) {

    var modalInstance = $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:termId, name:title, scope:'GO'};
        }
      }
    });

  };



});
