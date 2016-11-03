app.controller('GOSlimCtrl', function($scope, $location, $window, $uibModal,
  hardCodedDataService, PreDefinedSlimSets,
  presetsService, PreDefinedSlimSetDetail, termService, basketService,
  stringService) {


  $scope.succesAlerts = [];
  $scope.otherAlerts = [];
  $scope.rootTermMFID = "GO:0003674";
  $scope.rootTermBPID = "GO:0008150";
  $scope.rootTermCCID = "GO:0005575";

  presetsService.getPresets().then(function(d) {
    $scope.geneProducts = d.data.geneProducts;
    $scope.predefinedSlimSets = d.data.goSlimSets;
  });

  $scope.species = hardCodedDataService.mostCommonTaxonomies;

  $scope.selectedItems = [];
  $scope.deSelectedItems = [];
  $scope.basketSelection = {};
  $scope.selectedSpecies = {};

  $scope.predefinedCheckboxes = {
    BPcheckbox: true,
    MFcheckbox: true,
    CCcheckbox: true
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
  $scope.basketPromise.then(function(d) {
    angular.forEach(d.data.results, function(term) {
      term.selected = false;
    })
    $scope.basketList = d.data.results;
  });

  // Predefined terms
  $scope.updatePredefinedSets = function() {
    console.log($scope.selectedPreDefinedSlimSet);
    // $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({
    //   setId: $scope.selectedPreDefinedSlimSet.subset
    // });
    // $scope.availablePredefinedTerms.$promise.then(function(data) {
    //
    //   var predefinedSets = _.groupBy(data, 'aspectDescription');
    //   $scope.predefinedBP = predefinedSets['Biological Process'];
    //   $scope.predefinedMF = predefinedSets['Molecular Function'];
    //   $scope.predefinedCC = predefinedSets['Cellular Component'];
    // });
  };

  var removeTerm = function(termID) {
    $scope.selectedItems = _.filter($scope.selectedItems, function(term) {
      return term.termId != termID;
    });
  };


  $scope.addPredefined = function() {
    var predefinedItems = [];
    if ($scope.predefinedCheckboxes.BPcheckbox) {
      if (!$scope.rootTermBP) {
        $scope.predefinedBP = _.without($scope.predefinedBP, _.findWhere($scope.predefinedBP, {
          name: 'biological_process'
        }));
      }
      predefinedItems = _.union(predefinedItems, $scope.predefinedBP);
    }
    if ($scope.predefinedCheckboxes.CCcheckbox) {
      if (!$scope.rootTermCC) {
        $scope.predefinedCC = _.without($scope.predefinedCC, _.findWhere($scope.predefinedCC, {
          name: 'cellular_component'
        }));
      }
      predefinedItems = _.union(predefinedItems, $scope.predefinedCC);
    }
    if ($scope.predefinedCheckboxes.MFcheckbox) {
      if (!$scope.rootTermMF) {
        $scope.predefinedMF = _.without($scope.predefinedMF, _.findWhere($scope.predefinedMF, {
          name: 'molecular_function'
        }));
      }
      predefinedItems = _.union(predefinedItems, $scope.predefinedMF);
    }
    addItemsToSelection(predefinedItems);
    resetPredefined();
  };

  var resetPredefined = function() {
    $scope.predefinedBP = [];
    $scope.predefinedCC = [];
    $scope.predefinedMF = [];
    $scope.predefinedCheckboxes.BPcheckbox = true;
    $scope.predefinedCheckboxes.CCcheckbox = true;
    $scope.predefinedCheckboxes.MFcheckbox = true;
    $scope.selectedPreDefinedSlimSet = '';
  };

  // Own terms
  $scope.addOwnTerms = function() {
    //TODO validate terms
    console.log($scope.slimOwnTerms);
    addItemsToSelection($scope.slimOwnTerms);
    $scope.slimOwnTerms = '';
  };

  //Basket terms
  $scope.addBasketTerms = function() {
    var items = _.filter($scope.basketList, function(d) {
      return d.selected;
    });
    addItemsToSelection(items);
  };

  var addItemsToSelection = function(itemsToAdd) {
    var union = _.union($scope.selectedItems, itemsToAdd);
    $scope.selectedItems = _.uniq(union, function(term) {
      return term.termId;
    });
  };

  $scope.getSelectedBPTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Biological Process';
    });
  };

  $scope.getSelectedMFTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Molecular Function';
    });
  };

  $scope.getSelectedCCTerms = function() {
    return _.filter($scope.selectedItems, function(item) {
      return item.aspectDescription === 'Cellular Component';
    });
  };

  $scope.getTotalCount = function() {
    return $scope.selectedItems;
  };

  $scope.removeFromSelection = function(termId) {
    // Remove from selected items
    $scope.selectedItems = _.filter($scope.selectedItems, function(term) {
      return term.termId != termId;
    });
    // Add to de-selected items
    termService.getTerm(termId).then(function(res) {
      $scope.deSelectedItems.push(res.data);
    });
  };

  $scope.addBackIntoSelection = function(termId) {
    // Remove from deSelectedItems
    $scope.deSelectedItems = _.filter($scope.deSelectedItems, function(term) {
      return term.termId != termId;
    });
    // Add back to selectedItems
    termService.getTerm(termId).then(function(res) {
      $scope.selectedItems.push(res.data);
    });
  };

  function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
      $('#sticky').addClass('stick');
      $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
      $('#sticky').removeClass('stick');
      $('#sticky-anchor').height(0);
    }
  }

  $(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
  });

  var dir = 1;
  var MIN_TOP = 200;
  var MAX_TOP = 350;

  function autoscroll() {
    var window_top = $(window).scrollTop() + dir;
    if (window_top >= MAX_TOP) {
      window_top = MAX_TOP;
      dir = -1;
    } else if (window_top <= MIN_TOP) {
      window_top = MIN_TOP;
      dir = 1;
    }
    $(window).scrollTop(window_top);
    window.setTimeout(autoscroll, 100);
  }

  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function() {

    $location.search('goTermUse', 'slim');
    $location.search('goRelations', 'IPO');

    $location.search('goID', _.pluck($scope.selectedItems, 'termId').join(","));

    // Add gene products
    if ($scope.genProductID) {
      var geneProductsAdded = stringService.getTextareaItemsAsArray($scope.genProductID);
      angular.forEach((geneProductsAdded), function(geneProdId) {
        $location.search('gpID', geneProdId);
      });
    }

    // Add taxons
    angular.forEach(_.keys($scope.selectedSpecies), function(taxonId) {
      // if($scope.selectedSpecies[taxonId])
      // filteringService.saveAppliedFilter({type: 'taxon', value: taxonId});
    });
    $location.path("annotations");
  };

  $scope.clearSelection = function() {
    $scope.selectedItems = [];
    $scope.deSelectedItems = [];
  };

  /**
   * Show the  graph image modal on request.
   * Turn the list of advancedFilters into to comma delimited list
   */
  $scope.showGraph = function() {
    $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function() {
          return {
            id: _.pluck($scope.selectedItems, 'termId').toString(),
            scope: 'GO'
          };
        }
      }
    });
  };

  $scope.showGraphPreDef = function() {
    var tempPredefinedItems = [];
    if ($scope.predefinedCheckboxes.BPcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedBP);
    }
    if ($scope.predefinedCheckboxes.CCcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedCC);
    }
    if ($scope.predefinedCheckboxes.MFcheckbox) {
      tempPredefinedItems = _.union(tempPredefinedItems, $scope.predefinedMF);
    }
    $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function() {
          return {
            id: _.pluck(tempPredefinedItems, 'termId').toString(),
            scope: 'GO'
          };
        }
      }
    });
  };

  $scope.showGraphOwnTerms = function() {
    if ($scope.slimOwnTerms) {
      var tempOwnTerms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms);
      $uibModal.open({
        templateUrl: 'charts/ontologyGraphModal.html',
        controller: 'OntologyGraphCtrl',
        windowClass: 'app-modal-window',
        scope: $scope,
        resolve: {
          graphModel: function() {
            return {
              id: tempOwnTerms.toString(),
              scope: 'GO'
            };
          }
        }
      });
    } else {
      $scope.succesAlerts.push({
        type: 'info',
        msg: 'Please add some term Id\'s first'
      });
    }
  };

  $scope.showGraphBasketItems = function() {

    var tempItems = _.filter(_.keys($scope.basketSelection), function(item) {
      return $scope.basketSelection[item];
    });

    if (tempItems.length >= 1) {
      var modalInstance = $uibModal.open({
        templateUrl: 'charts/ontologyGraphModal.html',
        controller: 'OntologyGraphCtrl',
        windowClass: 'app-modal-window',
        scope: $scope,
        resolve: {
          graphModel: function() {
            return {
              id: tempItems.toString(),
              scope: 'GO'
            };
          }
        }
      });
    } else {
      $scope.succesAlerts.push({
        type: 'info',
        msg: 'Please select some basket terms from the list first'
      });
    }
  };

});
