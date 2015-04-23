/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl1', function($scope, $location, $window, hardCodedDataService, PreDefinedSlimSets,
                                      PreDefinedSlimSetDetail, term, basketService, wizardService, filteringService) {

  $scope.advancedFilters = {};
  /**
   * For display
   * @type {Array}
   */
  $scope.availablePredefinedTerms = [];

  /**
   * Get basket items
   */
  $scope.basketList=basketService.getItems();

  /**
   * Get predefined slim sets
   */
  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  /**
   * Load already selected terms
   */
  $scope.ownTerms = wizardService.getOwnTerms();
  $scope.predefinedTerms = wizardService.getSelectedPredefinedTerms();
  //$scope.selectedbasketTerms = wizardService.getSelectedBasketTerms();  //Modify basket contents directly
  $scope.selectedPreDefinedSlimSet = wizardService.getSelectedPredefinedSlimSet();

  if (!$scope.selectedPreDefinedSlimSet===undefined){
    $scope.showSlimSet();
  }


  /**
   * Set basket terms already selected to selected state
   */
  //angular.forEach($scope.basketList, function (basketItem) {
  //    angular.forEach($scope.selectedbasketTerms, function (selectedBasketTerm) {
  //      if(basketItem.goId == selectedBasketTerm.termId){
  //        basketItem.Selected=true;
  //      }
  //    });
  //});


  /**
   * Load required slim set
   */
  $scope.showSlimSet = function() {

    $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({setId: $scope.selectedPreDefinedSlimSet.subset});
    $scope.availablePredefinedTerms.$promise.then(function (data) {
      $scope.availablePredefinedTerms = data;
    });
  };


  /**
   * Add own terms to selectable list
   * @param ownTermsList
   */
  $scope.addOwnTerms = function(ownTermsList){
    var termData=term.query({termId : ownTermsList});

    //Parse list and add to predefined terms
    termData.$promise.then(function(data) {
      $scope.ownTerms = $scope.ownTerms.concat(data);

      angular.forEach($scope.ownTerms, function (aTerm) {
        aTerm.Selected = true;
      });
    });
  };


  /**
   * Turn on and off the selection of al Biological Process Terms
   * @param type
   */
  $scope.checkAllBio = function (type) {
    console.log("check all bio called");
    if ($scope.selectedAllBio) {
      $scope.selectedAllBio = false;
    } else {
      $scope.selectedAllBio = true;
    }

    //console.log("Contents of available predefined terms", $scope.availablePredefinedTerms);
    angular.forEach($scope.availablePredefinedTerms, function (aTerm) {
      //console.log("available term", aTerm);
      if(aTerm.aspectDescription==type) {
        //console.log("Setting check for ", type);
        aTerm.Selected = $scope.selectedAllBio;
      }

    });

  };


  /**
   * Turn on and off the selection of all Molecular Terms
   * @param type
   */
  $scope.checkAllMol = function (type) {
    if ($scope.selectedAllMol) {
      $scope.selectedAllMol = false;
    } else {
      $scope.selectedAllMol = true;
    }

    angular.forEach($scope.availablePredefinedTerms, function (aTerm) {
      if(aTerm.aspectDescription==type) {
        aTerm.Selected = $scope.selectedAllMol;
      }
    });
  };


  /**
   * Turn on and off the selection of al Cellular Component Terms
   * @param type
   */
  $scope.checkAllCell = function (type) {
    if ($scope.selectedAllCell) {
      $scope.selectedAllCell = false;
    } else {
      $scope.selectedAllCell = true;
    }

    angular.forEach($scope.availablePredefinedTerms, function (aTerm) {
      if(aTerm.aspectDescription==type) {
        aTerm.Selected = $scope.selectedAllCell;
      }
    });
  };


  /**
   * Save all selected terms on the use of the next button.
   * Route to page 2 of the wizard.
   */
  $scope.nextSlimming = function(){
    console.log("next slimming called");

    // 1. Add all selected terms from preDefined slim sets.
    //var newSelectedPredefinedTerms = [];
    //angular.forEach($scope.availablePredefinedTerms, function (aTerm) {
    //  if(aTerm.Selected){
    //    newSelectedPredefinedTerms.push(aTerm.termId);
    //  }
    //});
    wizardService.setSelectedPredefinedTerms($scope.availablePredefinedTerms);

    // 2. Add all own terms
    //var newSelectedOwnTerms = [];
    //angular.forEach($scope.ownTerms, function (aTerm) {
    //  if(aTerm.Selected){
    //    newSelectedOwnTerms.push(aTerm.termId);
    //  }
    //});
    //console.log("saving own terms to wizard service", newSelectedOwnTerms);
    wizardService.setOwnTerms($scope.ownTerms);

    // 3. Add all basket terms
    //var newSelectedBasketTerms = [];
    //angular.forEach($scope.basketList, function (aTerm) {
    //  if(aTerm.Selected){
    //    newSelectedBasketTerms.push(aTerm);
    //  }
    //});
    //wizardService.setSelectedBasketTerms(newSelectedBasketTerms);

    basketService.refreshBasket($scope.basketList);


    // 4. Save predefined slim set
    wizardService.setSelectedPredefinedSlimSet($scope.selectedPreDefinedSlimSet);


    $location.path("slimming2");
  }

  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function(advancedFilters){

    //No point saving them to the wizard on the first page, lets just send them to the filtering service
    //wizardService.setSelectedPredefinedTerms($scope.availablePredefinedTerms);
    //wizardService.setOwnTerms($scope.ownTerms);
    //wizardService.setSelectedPredefinedSlimSet($scope.selectedPreDefinedSlimSet);

    //console.log("Predefined slim terms", $scope.availablePredefinedTerms);
    //console.log("Own terms", $scope.ownTerms);
    //console.log("Predefind slim set", $scope.selectedPreDefinedSlimSet);

    console.log("Advanced filters in slimming one", advancedFilters);

    //Try and deal with async query service
    //var isSlim=1;
    filteringService.populateAppliedFilters(advancedFilters, 1);
    //resultFiltering.$promise.then(function(){

      console.log("Populated the filtering service, maybe");

      //Tell annotations list this value has been updated.
      //No we don't need to do this as going back to first page anyway
      //$scope.$emit('filtersUpdate', advancedFilters);   //todo change this so is notification only

      //$location.path("annotations");
      $window.location.href= "#annotations";

   // });

  }

});
