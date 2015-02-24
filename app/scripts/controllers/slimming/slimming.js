/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl', function($scope, hardCodedDataService, PreDefinedSlimSets, PreDefinedSlimSetDetail, term) {

//  $scope.predefinedSlimSets = hardCodedDataService.getPreDefinedSlimSets();
  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  //$scope.bioProcessTerms = [{'goId':'GO:0006412', 'goName':'translation'}];
  $scope.availableTerms = [];
  $scope.enteredTerms = [];

  //$scope.molFunctionTerms = [];
  //$scope.cellComponentTerms = [];
  $scope.predefinedTerms = [];

  /**
   * Model to hold selected go terms
   * @param selectedSlimSet
   */
  $scope.selectedGoTerms = {};

  $scope.showSlimSet = function(){

    console.log("Got selected slim set", $scope.selectedPreDefinedSlimSet);

    $scope.availableTerms = PreDefinedSlimSetDetail.query({setId : $scope.selectedPreDefinedSlimSet.subset});
    //
    $scope.availableTerms.$promise.then(function(data) {
      console.log("got promise", data);
      $scope.availableTerms.concat(data)
    });

    //
    //  $scope.availableTerms = [];
    //  $scope.availableTerms =  $scope.availableTerms.concat(data);
    //  console.log("Added to bioProcessTerms", $scope.availableTerms);
    //});

    //var deferred = $q.defer();
    //
    //var getAvailableSlimList = function(){
    //  PreDefinedSlimSetDetail.query({setId : $scope.selectedPreDefinedSlimSet.subset});
    //}

  }


  //function asyncPredefinedSlimDetail(subset){
  //  return $q(function resolve, reject){
  //    setT
  //  }
  //}


  $scope.addOwnTerms = function(ownTermsList){

    console.log("Got own terms list", ownTermsList);
    var termData=term.query({termId : ownTermsList});
    console.log("Term Data", termData)

    //Parse list and add to predefined terms
    $scope.availableSlimList.$promise.then(function(data) {
      console.log("got promise", data);

      $scope.availableTerms = [];
      $scope.availableTerms =  $scope.availableTerms.concat($scope.availableSlimList);
      console.log("Added to bioProcessTerms", $scope.availableTerms);
    });
  }


});
