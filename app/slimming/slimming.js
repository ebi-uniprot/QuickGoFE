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

    $scope.slimTermBp=[];
    $scope.slimTermMf=[];
    $scope.slimTermCc=[];


    $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({setId: $scope.selectedPreDefinedSlimSet.subset});
    $scope.availablePredefinedTerms.$promise.then(function (data) {
      $scope.availablePredefinedTerms = data;


      //On loading all the terms for a selected predefined set, set their selection to true as the default.
      //We are setting the name of the variable to be saved to be the termid, as well as the value it holds.

      //Initialize
      $scope.advancedFilters.boolean = {};
      $scope.advancedFilters.boolean.goID = {};

      var k=-1;
      for(k=0; k<$scope.availablePredefinedTerms.length; k++){

        //Save deach
        var aTerm = $scope.availablePredefinedTerms[k];

        if(aTerm.aspectDescription=='Biological Process'){
          $scope.slimTermBp.push(aTerm);
        }

        if(aTerm.aspectDescription=='Molecular Function'){
          $scope.slimTermMf.push(aTerm);
        }

        if(aTerm.aspectDescription=='Cellular Component'){
          $scope.slimTermCc.push(aTerm);
        }


        //By default, all the Go Terms in the slim set are set to choosen, except for the root terms,
        // GO:0008150 biological process
        // GO:0003674 molecular_function
        // GO:0005575 cellular_component

        if(aTerm.termId != 'GO:0008150' && aTerm.termId != 'GO:0003674' &&  aTerm.termId != 'GO:0005575') {
          $scope.advancedFilters.boolean.goID[[aTerm.termId]] = aTerm.termId;
        }

      }

      console.log("Loaded advanced filters = ",$scope.advancedFilters);

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
  $scope.selectAll = function (type) {
    console.log("selectClearAll called", type);

    var k=-1;
    for(k=0; k<$scope.availablePredefinedTerms.length; k++){
      var aTerm = $scope.availablePredefinedTerms[k];

      if(aTerm.aspectDescription==type) {
        if ($scope.advancedFilters.boolean.goID[[aTerm.termId]] == aTerm.termId) {
          $scope.advancedFilters.boolean.goID[[aTerm.termId]] = undefined;
        } else {
          $scope.advancedFilters.boolean.goID[[aTerm.termId]] = aTerm.termId;
        }
      }
    }


  };



  /**
   * Turn on and off the selection of all Biological Process Terms
   * @param type
   */
  $scope.selectAllBp = function () {
    angular.forEach($scope.slimTermBp, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = aTerm.termId;
    });
  };


  /**
   * Turn on and off the selection of all Biological Process Terms
   * @param type
   */
  $scope.clearAllBp = function () {
    angular.forEach($scope.slimTermBp, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = undefined;
    });
  };



  /**
   * Turn on and off the selection of all Molecular Function Terms
   * @param type
   */
  $scope.selectAllMf = function () {
    angular.forEach($scope.slimTermMf, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = aTerm.termId;
    });
  };


  /**
   * Turn on and off the selection of all Molecular Function Terms
   * @param type
   */
  $scope.clearAllMf = function () {
    angular.forEach($scope.slimTermMf, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = undefined;
    });
  };



  /**
   * Turn on and off the selection of all Cellular Component Terms
   * @param type
   */
  $scope.selectAllCc = function () {
    angular.forEach($scope.slimTermCc, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = aTerm.termId;
    });
  };


  /**
   * Turn on and off the selection of all Cellular Component Terms
   * @param type
   */
  $scope.clearAllCc = function () {
    angular.forEach($scope.slimTermCc, function (aTerm) {
      $scope.advancedFilters.boolean.goID[[aTerm.termId]] = undefined;
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
