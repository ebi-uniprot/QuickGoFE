/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl', function($scope, $location, $window, $uibModal, hardCodedDataService, PreDefinedSlimSets,
                                      PreDefinedSlimSetDetail, termService, basketService, wizardService, filteringService) {


/*
GO:0008150
GO:0055085
GO:0006811
GO:0006520
GO:0008150, GO:0055085, GO:0006811, GO:0006520
GO:0008150 GO:0055085 GO:0006811 GO:0006520
*/
  $scope.succesAlerts = []; 
  $scope.otherAlerts = [];

  $scope.species = [
      {id: 9606, displayName: 'Human'},
      {id: 10090, displayName: 'Mouse'},
      {id: 10116, displayName: 'Rat'},
      {id: 40674, displayName: 'Mammalia'},
      {id: 3398, displayName: 'Magnoliophyta (flowering plants)'},
      {id: 2759, displayName: 'Eukaryota'},
      {id: 1117, displayName: 'Cyanobacteria'},
      {id: 3702, displayName: 'Arabidopsis'},
      {id: 559292, displayName: 'Saccharomyces verevisiae'},
      {id: 83333, displayName: 'Escherichia coli'},
      {id: 6239, displayName: 'Caenorhabditis elegans'},
      {id: 7955, displayName: 'Danio rerio'},
      {id: 44689, displayName: 'Dictyostelium discoideum'},
      {id: 7227, displayName: 'Drosophila melanogaster'},
      {id: 9031, displayName: 'Gallus gallus'},
      {id: 9913, displayName: 'Bos taurus'}

    ];

  $scope.selectedItems = [];
  $scope.basketSelection = {};

  $scope.predefinedCheckboxes = {
    BPcheckbox : true,
    MFcheckbox : true,
    CCcheckbox : true
  };


  $scope.advancedFilters = {};
  /**
   * For display
   * @type {Array}
   */
  $scope.availablePredefinedTerms = [];

  /**
   * Get basket items
   */
  $scope.basketPromise = basketService.getItems();
  $scope.basketPromise.then(function(d){
    $scope.basketList = d.data;
  })
  /**
   * Get predefined slim sets
   */
  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  /**
   * Load already selected terms
   */
  $scope.ownTerms = wizardService.getOwnTerms();
  $scope.predefinedTerms = wizardService.getSelectedPredefinedTerms();
  $scope.selectedPreDefinedSlimSet = wizardService.getSelectedPredefinedSlimSet();

  if (!$scope.selectedPreDefinedSlimSet===undefined){
    $scope.showSlimSet();
  }

  $scope.updatePredefinedSets = function() {
    $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({setId: $scope.selectedPreDefinedSlimSet.subset});
    $scope.availablePredefinedTerms.$promise.then(function (data) {
      var predefinedSets = _.groupBy(data, 'aspectDescription');
      $scope.predefinedBP = predefinedSets['Biological Process'];
      $scope.predefinedMF = predefinedSets['Molecular Function'];
      $scope.predefinedCC = predefinedSets['Cellular Component'];
    });
  };


  $scope.addPredefined = function() {
    var predefinedItems = [];
    if($scope.predefinedCheckboxes.BPcheckbox) {
      predefinedItems = _.union(predefinedItems, $scope.predefinedBP);
    } if($scope.predefinedCheckboxes.CCcheckbox) {
      predefinedItems = _.union(predefinedItems, $scope.predefinedCC);
    } if($scope.predefinedCheckboxes.MFcheckbox) {
      predefinedItems = _.union(predefinedItems, $scope.predefinedMF);
    }
    addItemsToSelection(predefinedItems);
  }

  $scope.getSelectedBPTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Biological Process';
    })
  };

  $scope.getSelectedMFTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Molecular Function';
    })
  };

  $scope.getSelectedCCTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Cellular Component';
    })
  };

  /**
   * Load required slim set
   */
  $scope.showSlimSet = function() {

    console.log("showSlimSet Function running");





      //On loading all the terms for a selected predefined set, set their selection to true as the default.
      //We are setting the name of the variable to be saved to be the termid, as well as the value it holds.

      //Initialize
      $scope.advancedFilters.boolean = {};
      $scope.advancedFilters.boolean.goID = {};

      angular.forEach($scope.availablePredefinedTerms, function(aTerm){
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

      });

      console.log("Loaded advanced filters = ",$scope.advancedFilters);
  };

  $scope.getTotalCount = function () {
    return $scope.selectedItems;
  };


  /**
   * Add own terms to selectable list
   * @param ownTermsList
   */
  $scope.addOwnTerms = function() {
    var ownTerms = _.uniq($scope.slimOwnTerms.replace( /\n/g, " " ).split(/[\s,]+/));
    $scope.ownTermPromise = termService.getTerms(ownTerms.toString());
    $scope.ownTermPromise.then(function(res) {
      //Add items to scope
      addItemsToSelection(_.filter(res.data, function(item){
        return item.termId; //currently needed because service returns empty object if not found. Bad bad bad service. #GOA-1652
      }));
      var missmatches = _.difference(ownTerms, _.pluck(res.data, 'termId'));
      if(missmatches.length > 0) {
        $scope.otherAlerts.push(
          {type: 'warning',msg: missmatches + ' are not valid identifiers.'}
        );
      }

      //Clean up text area
      $scope.slimOwnTerms = '';
    });
  };


  $scope.addBasketTerms = function() {
    var items = _.filter(_.keys($scope.basketSelection), function(item){
      return $scope.basketSelection[item];
    });
    termService.getTerms(items).then(function(res){
      console.log(res.data);
      addItemsToSelection(res.data);
    });
  };

  var addItemsToSelection = function(itemsToAdd) {
    var beforeItemCount = $scope.selectedItems.length;
    var union = _.union($scope.selectedItems, itemsToAdd);
    $scope.selectedItems = _.uniq(union, function(term){
      return term.termId;
    });
    //Display alerts
    var afterItemCount = $scope.selectedItems.length;
    console.log(beforeItemCount, afterItemCount);
    if(afterItemCount > beforeItemCount) {
      $scope.succesAlerts.push(
        {type: 'success',msg: (afterItemCount-beforeItemCount) + ' terms added to Your Selection.'}
      );
    }
    if(itemsToAdd.length > (afterItemCount - beforeItemCount)) {
      $scope.succesAlerts.push(
        {type: 'info',msg:  (itemsToAdd.length - (afterItemCount - beforeItemCount)) + ' terms were already part of your selection.'}
      );
    }
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


    var modalInstance = $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:itemString, scope:'GO'};
        }
      }
    });

  };


});
