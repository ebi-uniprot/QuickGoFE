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
      templateUrl: 'modals/ontologyGraphModal.html',
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
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

});

