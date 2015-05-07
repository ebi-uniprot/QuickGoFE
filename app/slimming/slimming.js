/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl1', function($scope, $location, $window, $modal, hardCodedDataService, PreDefinedSlimSets,
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
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function(advancedFilters){
    console.log("Advanced filters in slimming one", advancedFilters);

    filteringService.populateAppliedFilters(advancedFilters, 1);
    $window.location.href= "#annotations";

  }

  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.nextSlimming = function(advancedFilters){
    console.log("Advanced filters in slimming one", advancedFilters);

    filteringService.populateAppliedFilters(advancedFilters, 1);
    //$window.location.href= "#annotations";
    $location.path("slimming2");    //todo - this one?

  }


  /**
   * Show the  graph image modal on request.
   * Turn the list of advancedFilters into to comma delimited list
   */
  $scope.showGraph = function () {

    var terms = filteringService.returnListOfFilters($scope.advancedFilters);
    console.log("Create a graph from the terms", terms)

    var k=0;
    var itemString="";
    for(k=0;k<terms.length;k++ ){
      itemString = itemString+terms[k].value;
      itemString=itemString+',';
    }

    console.log("Item String", itemString);


    var modalInstance = $modal.open({
      templateUrl: 'modals/ancestorChartModal.html',
      controller: 'AncestorChartCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        chartRequest: function () {
          return {ids:itemString};
        }
      }
    });

  };


});
