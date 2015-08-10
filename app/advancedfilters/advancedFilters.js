/**
 * Created by twardell on 04/03/2015
 * This controller handles the creation and initial processing of the advanced filters modal.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $modalInstance, $modal, $location, basketService, evidencetypes, withDBs,
                                               assignDBs, filteringService, hardCodedDataService, PreDefinedSlimSets) {


  $scope.advancedFilters = {};
  $scope.useSlim = 0;

  /**
   * ---------------------------------------   Data loading Operations    --------------------------------------------
   */

  //Basket items are used by the go identifer tab
  $scope.basketItems = basketService.getItems();
  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
  $scope.referenceList = hardCodedDataService.getFilterReferences();
  $scope.qualifiers = hardCodedDataService.getQualifiers();



  /**
   * Get predefined slim sets
   */
  //$scope.predefinedSlimSets = PreDefinedSlimSets.query();
  var resultPSS = PreDefinedSlimSets.query();
  resultPSS.$promise.then(function(data){
    $scope.predefinedSlimSets = data;
    console.log("PredefinedSlimSets", $scope.predefinedSlimSets);
  });

  /**
   * Get Evidence Types
   */
  var resultET = evidencetypes.query();
  resultET.$promise.then(function(data){
    $scope.evidenceTypes = data;
    console.log("Got Evidence Types", $scope.evidenceTypes);
  });

  /**
   * Get With DBs
   */
  var resultWDB = withDBs.query();
  resultWDB.$promise.then(function(data){
    $scope.withDBs = data;
    $scope.withDBs.sort(function comparewithDBs(a,b) {
      if (a.dbId < b.dbId)
        return -1;
      if (a.dbId > b.dbId)
        return 1;
      return 0;
    });
    //console.log("Got With DBs", $scope.withDBs);
  });



  /**
   * Get Assigned DBs
   */
  var resultADB = assignDBs.query();
  resultADB.$promise.then(function(data){
    $scope.assignDBs = data;
    $scope.assignDBs.sort(function comparewithDBs(a,b) {
      if (a.dbId < b.dbId)
        return -1;
      if (a.dbId > b.dbId)
        return 1;
      return 0;
    });
    //console.log("Got Assigned DBs", $scope.assignDBs);
  });


  /**
   * ---------------------------------------   Button related functions   --------------------------------------------
   */

  $scope.cancel  = function(){
    $modalInstance.dismiss('cancel');

  }

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.submit = function(){

    console.log("Submitted advancedFilters",$scope.advancedFilters);
    console.log("Submitted useSlim",$scope.useSlim);

    //If a goid has not been selected then remove the defaults for ancestor and relationship from the submitted filters
    console.log("Clear the defaults for radio buttons in the advanced filters dialogue. ", $scope.advancedFilters);

    hasGoId=0;

    for(var input in $scope.advancedFilters.boolean) {

      if ($scope.advancedFilters.boolean.hasOwnProperty(input)) {
        if (input == 'goID') {
          hasGoId = 1;
        }
      }
    }

    for(var input in $scope.advancedFilters.text) {

      if ($scope.advancedFilters.text.hasOwnProperty(input)) {
        if (input == 'goID' || input=='predefinedSlimSet') {
          hasGoId = 1;
        }
      }
    }

    if(hasGoId==0){
      delete $scope.advancedFilters.text.goTermUse;
      delete $scope.advancedFilters.text.goRelations;
    }


    filteringService.populateAppliedFilters( $scope.advancedFilters,  $scope.useSlim);

    //Tell annotations list this value has been updated.

    $scope.$emit('filtersUpdate', $scope.advancedFilters);   //todo change this so is notification only

    //Now go back to the annotation list
    $modalInstance.dismiss('cancel');
    $location.path("annotations");
  }


  /**
   * ------------------------------------ Evidence Code Graph Image --------------------------------------------------
   */


  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showEvidenceCodeOntologyGraph = function (ecoId) {

    var modalInstance = $modal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:ecoId, name:'', scope:'ECO'};
        }
      }
    });

  };

  /**
   * ------------------------------------ Filtering Operations for Go Ids ----------------------------------------------
   */

  //If any go term use other than exact is chosen, set the go relations (if not already set) to the default of IPO
  $scope.ensureGoRelations = function(){
    if(advancedFilters.text.goRelations == undefined || advancedFilters.text.goRelations==null){
      $scope.advancedFilters.text.goRelations = 'IPO';
    }
  }


  // If a go term use of exact has been selected, then we should not set the value for go relations
  $scope.removeGoRelations = function(){
    console.log("Removing go relations");
    delete $scope.advancedFilters.text.goRelations;
  }

  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

});

