/**
 * Created by twardell on 04/03/2015.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $modalInstance, $location, basketService, evidencetypes, withDBs,
                                               assignDBs, filteringService) {

  /**
   * Basket items are used by the go identifer tab
   */
  $scope.basketItems = basketService.getItems();
  $scope.advancedFilters = {};

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
    console.log("Got With DBs", $scope.withDBs);
  });


  /**
   * Get Assigned DBs
   */
  var resultADB = assignDBs.query();
  resultADB.$promise.then(function(data){
    $scope.assignDBs = data;
    console.log("Got Assigned DBs", $scope.assignDBs);
  });


  /**
   * Button related functions
   */

  $scope.cancel  = function(){
    $modalInstance.dismiss('cancel');

  }

  /**
   * Iterate through ALL selectable elements
   * Create a list of selected ones
   * Pass that list to the filtering service.
   */
  $scope.submit = function(advancedFilters){

    console.log("get the text area value", advancedFilters);
    //filteringService.setFilters(advancedFilters);

    //Tell parent page this value has been updated.

    $scope.$emit('filtersUpdate', advancedFilters);

    //Now go back to the annotation list
    $modalInstance.dismiss('cancel');
    $location.path("annotations");
  }


  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };
});

