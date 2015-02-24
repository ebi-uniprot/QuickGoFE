/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl1', function($scope, $location, hardCodedDataService, PreDefinedSlimSets,
                                      PreDefinedSlimSetDetail, term, basketService, wizardService) {

  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  $scope.availableTerms = [];
  $scope.enteredTerms = [];
  $scope.predefinedTerms = [];

  /**
   * Model to hold selected go terms
   * @param selectedSlimSet
   */
  $scope.selectedGoTerms = {};

  /**
   * Get basket items
   */

  $scope.basketList=basketService.getItems();


  $scope.showSlimSet = function() {
    $scope.availableTerms = PreDefinedSlimSetDetail.query({setId: $scope.selectedPreDefinedSlimSet.subset});
    $scope.availableTerms.$promise.then(function (data) {
      $scope.availableTerms.concat(data)
    });
  };



  $scope.addOwnTerms = function(ownTermsList){
    var termData=term.query({termId : ownTermsList});

    //Parse list and add to predefined terms
    $scope.availableSlimList.$promise.then(function(data) {
      $scope.availableTerms = [];
      $scope.availableTerms =  $scope.availableTerms.concat($scope.availableSlimList);
    });
  };

  //$scope.selectedAll = true;


  $scope.checkAllBio = function (type) {
    if ($scope.selectedAllBio) {
      $scope.selectedAllBio = false;
    } else {
      $scope.selectedAllBio = true;
    }

    angular.forEach($scope.availableTerms, function (aTerm) {
      if(aTerm.aspectDescription==type) {
        aTerm.Selected = $scope.selectedAllBio;

      }
    });
  };

  $scope.checkAllMol = function (type) {
    if ($scope.selectedAllMol) {
      $scope.selectedAllMol = false;
    } else {
      $scope.selectedAllMol = true;
    }

    angular.forEach($scope.availableTerms, function (aTerm) {
      if(aTerm.aspectDescription==type) {
        aTerm.Selected = $scope.selectedAllMol;
      }
    });
  };

  $scope.checkAllCell = function (type) {
    if ($scope.selectedAllCell) {
      $scope.selectedAllCell = false;
    } else {
      $scope.selectedAllCell = true;
    }

    angular.forEach($scope.availableTerms, function (aTerm) {
      if(aTerm.aspectDescription==type) {
        aTerm.Selected = $scope.selectedAllCell;
      }
    });
  };

  $scope.nextSlimming = function(){
    console.log("next slimming called");
    var selectedTerms = []
    angular.forEach($scope.availableTerms, function (aTerm) {
      if(aTerm.Selected){
        selectedTerms.push(aTerm);
      }
    });
    wizardService.setSelectedTerms(selectedTerms);
    $location.path("slimming2");
  }


});
