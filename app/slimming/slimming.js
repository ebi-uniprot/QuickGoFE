app.controller('GOSlimCtrl', function($scope, $location, $window, $uibModal, hardCodedDataService, PreDefinedSlimSets,
                                      PreDefinedSlimSetDetail, termService, basketService, filteringService, stringService) {


  $scope.succesAlerts = [];
  $scope.otherAlerts = [];
  $scope.basketTermsInSelection = [];
  $scope.availablePredefinedTerms = '';
  $scope.rootTermMFID = "GO:0003674";
  $scope.rootTermBPID = "GO:0008150";
  $scope.rootTermCCID = "GO:0005575";

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

      // remove the 3 root terms
      var data = _.without(data, _.findWhere(data, {name: 'molecular_function'} ));
      var data = _.without(data, _.findWhere(data, {name: 'biological_process'} ));
      var data = _.without(data, _.findWhere(data, {name: 'cellular_component'} ));

      var predefinedSets = _.groupBy(data, 'aspectDescription');
      $scope.predefinedBP = predefinedSets['Biological Process'];
      $scope.predefinedMF = predefinedSets['Molecular Function'];
      $scope.predefinedCC = predefinedSets['Cellular Component'];
    });
  };

  $scope.addRootTerm = function(sourceCheckBox){
    $scope.addThisRootTerm = "";
    if(sourceCheckBox == "rootTermMF"){
      if($scope.rootTermMF){
        $scope.addThisRootTerm = "GO:0003674";
      }else {
        removeTerm("GO:0003674");
      }
    }

    if(sourceCheckBox == "rootTermBP"){
      if($scope.rootTermBP){
        $scope.addThisRootTerm = "GO:0008150";
      } else {
        removeTerm("GO:0008150");
      }
    }

    if(sourceCheckBox == "rootTermCC"){
      if($scope.rootTermCC){
        $scope.addThisRootTerm = "GO:0005575";
      }else {
        removeTerm("GO:0005575");
      }
    }

    // Now lets add the Root term
    termService.getTerm($scope.addThisRootTerm).then(function(res){
      addItemsToSelection(res.data);
    });
    $scope.addThisRootTerm = "";
  }

  var removeTerm = function(termID){
    $scope.selectedItems = _.filter($scope.selectedItems, function(term){
      return term.termId != termID;
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
    var validatedTerms = basketService.validateTerms($scope.slimOwnTerms);
    termService.getTerms(validatedTerms.valid).then(function(terms){
      addItemsToSelection(terms.data);
    });
    if(validatedTerms.missmatches.length > 0) {
      $scope.otherAlerts = [];
      $scope.otherAlerts.push(
        {type: 'warning',msg: validatedTerms.missmatches + ' are not valid identifiers.'}
      );
    }
    //Clean up text area
    $scope.slimOwnTerms = '';
  };



  // Basket terms
  $scope.addBasketTerms = function() {
    var items = _.filter(_.keys($scope.basketSelection), function(item){

      // add to the basketTermsInSelection for safe keeping
      $scope.basketTermsInSelection.push(item);

      // remove item from the basketList
      $scope.basketList = _.filter($scope.basketList, function(term){
        return term.termId != item;
      })
      return $scope.basketSelection[item];
    });

    termService.getTerms(items).then(function(res){
      addItemsToSelection(res.data);
      $scope.basketSelection = [];
    });

    //reset selection
    $scope.basketSelection = _.map($scope.basketSelection, function(key, val){
      return {key: false};
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

    if(itemsToAdd.length > (afterItemCount - beforeItemCount)) {
      $scope.succesAlerts = [];
      $scope.succesAlerts.push(
        {type: 'info',msg:  (itemsToAdd.length - (afterItemCount - beforeItemCount)) + ' terms were already part of your selection. ' + (afterItemCount-beforeItemCount) + ' new term(s) were added.'}
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
    // Remove from selected items
    $scope.selectedItems = _.filter($scope.selectedItems, function(term){
      return term.termId != termId;
    })

    // if item was originally in the basketTermsInSelection then add it back into the basket options
    if(_.indexOf($scope.basketTermsInSelection, termId) >= 0){
       termService.getTerm(termId).then(function(res){
         $scope.basketList.push(res.data);
       });

      // now remove the relocated item from the temporary basketTermsInSelection
      $scope.basketTermsInSelection = _.filter($scope.basketTermsInSelection, function(term){
        return term != termId;
      })

    }
  }

  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function(){
    // var url = "annotations/filter?goTermUse=slim&goRelations=IPO";

    $location.search('goTermUse','slim');
    $location.search('goRelations','IPO');

    $location.search('goID', _.pluck($scope.selectedItems, 'termId').join(","));

    // Add gene products
    if($scope.genProductID){
      var geneProductsAdded = stringService.getTextareaItemsAsArray($scope.genProductID);
      angular.forEach((geneProductsAdded), function(geneProdId, n) {
        $location.search('gpID', geneProdId);
      });
    }

    // Add taxons
    if($scope.selectedSpecies){
      angular.forEach(_.keys($scope.selectedSpecies), function(taxonId, n) {
        if($scope.selectedSpecies[taxonId]) {
          $location.search('taxon', taxonId);
        }
      });
    }
    $location.path("/annotations/filter");
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
  var tempOwnTerms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms);
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
