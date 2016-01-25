app.controller('GOSlimCtrl', function($scope, $location, $window, $uibModal, hardCodedDataService, PreDefinedSlimSets,
                                      PreDefinedSlimSetDetail, termService, basketService, filteringService) {


  $scope.succesAlerts = [];
  $scope.otherAlerts = [];
  $scope.availablePredefinedTerms = '';

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

    $scope.geneProducts = [
      {id: 'BHF-UCL', displayName: 'BHF-UCL'},
      {id: 'Exosome', displayName: 'Exosome'},
      {id: 'KRUK', displayName: 'KRUK'},
      {id: 'ParkinsonsUK-UCL', displayName: 'Parkinsons UK - UCL'},
      {id: 'ReferenceGenome', displayName: 'Reference Genome'}
    ];

  $scope.selectedItems = [];
  $scope.basketSelection = {};
  $scope.selectedSpecies = {};

  $scope.predefinedCheckboxes = {
    BPcheckbox : true,
    MFcheckbox : true,
    CCcheckbox : true
  };

  $scope.oneAtATime = true;
  $scope.status = {
    isFirstOpen: true
  };

  $scope.advancedFilters = {};

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

  // Predefined terms
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
    resetPredefined();
  }

  var resetPredefined = function() {
      $scope.predefinedBP = [];
      $scope.predefinedCC = [];
      $scope.predefinedMF = [];
      $scope.predefinedCheckboxes.BPcheckbox = true;
      $scope.predefinedCheckboxes.CCcheckbox = true;
      $scope.predefinedCheckboxes.MFcheckbox = true;
      $scope.selectedPreDefinedSlimSet = '';
      $scope.availablePredefinedTerms = ''
  }

  // Own terms
  $scope.addOwnTerms = function() {
    $scope.ownTermPromise = basketService.validateTerms($scope.slimOwnTerms);
    $scope.ownTermPromise.then(function(res){
      addItemsToSelection(res.valid);
      if(res.missmatches.length > 0) {
        $scope.otherAlerts.push(
          {type: 'warning',msg: res.missmatches + ' are not valid identifiers.'}
        );
      }
      //Clean up text area
      $scope.slimOwnTerms = '';
    });
  };

  // Basket terms
  $scope.addBasketTerms = function() {
    var items = _.filter(_.keys($scope.basketSelection), function(item){
      console.log("basketselection",$scope.basketSelection);
      console.log("Ticked item: ",item);
      return $scope.basketSelection[item];
    });
    termService.getTerms(items).then(function(res){
      console.log(res.data);
      addItemsToSelection(res.data);
      $scope.basketSelection = [];

      // now make the items that exist in the selection, greyed out in the pick list


    });
    //reset selection
    $scope.basketSelection = _.map($scope.basketSelection, function(key, val){
      return {key: false};
    });

  };

  // now make the items that exist in the selection, greyed out in the pick list
var disableBasketItemsSelected = function(basketItemsList) {
// first make them all active


// compare them to the selectedItems list and deactive any that feature there



};




  var addItemsToSelection = function(itemsToAdd) {
    var beforeItemCount = $scope.selectedItems.length;
//    console.log(beforeItemCount);
    var union = _.union($scope.selectedItems, itemsToAdd);
//    console.log(union);
    $scope.selectedItems = _.uniq(union, function(term){
      return term.termId;
    });
    //Display alerts
    var afterItemCount = $scope.selectedItems.length;
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

  $scope.getTotalCount = function () {
    return $scope.selectedItems;
  };


  $scope.removeFromSelection = function(termId) {
    $scope.selectedItems = _.filter($scope.selectedItems, function(term){
      return term.termId != termId;
    })
  }


  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function(){
    filteringService.clearFilters();
    angular.forEach($scope.selectedItems, function(item){
      filteringService.saveAppliedFilter({type: 'goID', value: item.termId});
    });
    filteringService.saveAppliedFilter({type: 'goTermUse', value: 'slim'});
    filteringService.saveAppliedFilter({type: 'goRelations', value: 'IPO'});



    // Add gene products
    var geneProductsAdded = _.uniq($scope.genProductID.replace( /\n/g, " " ).split(/[\s,]+/));
    angular.forEach((geneProductsAdded), function(geneProdId) {
      filteringService.saveAppliedFilter({type: 'gpID', value: geneProdId});
    });

    // Add taxons
    angular.forEach(_.keys($scope.selectedSpecies), function(taxonId) {
      console.log($scope.selectedSpecies[taxonId]);
      if($scope.selectedSpecies[taxonId])
        filteringService.saveAppliedFilter({type: 'taxon', value: taxonId});
    });


    $window.location.href= "#annotations";
  }

  $scope.clearSelection = function(){
    $scope.selectedItems = [];
  }

  /**
   * Show the  graph image modal on request.
   * Turn the list of advancedFilters into to comma delimited list
   */
  $scope.showGraph = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:_.pluck($scope.selectedItems, 'termId').toString(), scope:'GO'};
        }
      }
    });
  };

  $scope.showGraphPreDef = function () {
    var tempPredefinedItems = [];
    if($scope.predefinedCheckboxes.BPcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedBP);
    } if($scope.predefinedCheckboxes.CCcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedCC);
    } if($scope.predefinedCheckboxes.MFcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedMF);
    }
    var modalInstance = $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {
            id:_.pluck(tempPredefinedItems, 'termId').toString(),
            scope:'GO'
          };
        }
      }
    });
  };

$scope.showGraphOwnTerms = function () {
if($scope.slimOwnTerms){
  var tempOwnTerms = _.uniq($scope.slimOwnTerms.replace( /\n/g, " " ).split(/[\s,]+/));
  var modalInstance = $uibModal.open({
    templateUrl: 'charts/ontologyGraphModal.html',
    controller: 'OntologyGraphCtrl',
    windowClass: 'app-modal-window',
    scope: $scope,
    resolve: {
      graphModel: function () {
        return {
          id:tempOwnTerms.toString(),
          scope:'GO'
        };
      }
    }
  });
}else{
  $scope.succesAlerts.push(
    {type: 'info',msg:  'Please add some term Id\'s first'}
  );
};
};

$scope.showGraphBasketItems = function () {

  var tempItems = _.filter(_.keys($scope.basketSelection), function(item){
    return $scope.basketSelection[item];
  });

  if(tempItems.length >= 1){
      var modalInstance = $uibModal.open({
        templateUrl: 'charts/ontologyGraphModal.html',
        controller: 'OntologyGraphCtrl',
        windowClass: 'app-modal-window',
        scope: $scope,
        resolve: {
          graphModel: function () {
            return {
              id:tempItems.toString(),
              scope:'GO'
            };
          }
        }
      });
    }else{
      $scope.succesAlerts.push(
        {type: 'info',msg:  'Please select some basket terms from the list first'}
      );
    };
};

});
