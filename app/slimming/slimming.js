'use strict';
app.controller('GOSlimCtrl', function($scope, $location, $q,
  hardCodedDataService, presetsService, $document, termService, basketService,
  stringService, validationService, filterService, taxonomyService, $rootScope, limitChecker) {

  $scope.selection = {};
  $scope.totalPerAspect = {};
  $scope.deSelectedItems = [];
  $scope.uploadLimitGO = hardCodedDataService.getServiceLimits().goId;
  $scope.uploadLimitTaxon = hardCodedDataService.getServiceLimits().taxonId;
  $scope.totalTaxon = 0;

  // Fixes the removed terms box to the top of the screen when scrolling
  $document.on('scroll', function() {
      var container = angular.element($document[0].querySelector('#selectionHeader'));
      if (container[0]) {
        if (container[0].getBoundingClientRect().top <= 10) {
          angular.element($document[0].querySelector('#removedTerms')).addClass('fixed');
        } else {
          var nav = angular.element($document[0].querySelector('#removedTerms'));
          if (nav.hasClass('fixed')) {
            nav.removeClass('fixed');
          }
        }
      }
  });

  var init = function() {
    $rootScope.cleanErrorMessages();
    angular.forEach($scope.aspects, function(aspect) {
      $scope.selection[aspect.id] = {
        'name': aspect.name,
        'terms': []
      };
      $scope.totalPerAspect[aspect.id] = 0;
    });

    $scope.additionalSelection = {
      'gpIds':[],
      'taxa':[]
    };
    $scope.species = [];
    taxonomyService.initTaxa($scope.species).then(function(data) {
      $scope.species = data.taxa;
      $scope.totalTaxon = data.totalChecked;
    });

    /**
     * Get basket items
     */
    $scope.basketPromise = basketService.getItems();
    $scope.basketPromise.then(function(d) {
      angular.forEach(d.data.results, function(term) {
        term.selected = false;
      });
      $scope.basketList = d.data.results;
    });
  };

  var promises = [];
  promises.push(presetsService.getPresetsGeneProducts());
  promises.push(presetsService.getPresetsGOSlimSets());
  promises.push(presetsService.getPresetsAspects());

  $q.all(promises).then(function(d){
    $scope.geneProducts = d[0].data.geneProducts;
    $scope.predefinedSlimSets = d[1].data.goSlimSets;
    $scope.aspects = d[2].data.aspects;
    init();
  });

  $scope.basketItemsSelected = function() {
    return _.any(_.pluck($scope.basketList, 'selected'));
  };

  var getMergedTermsAndTotal = function(terms, aspectMap) {
    var mergedTerms = jQuery.extend(true, {}, $scope.selection); //NOTE: use angular's extend, not jQuery
    var totalCheckedAfterMerge = $scope.getTotalChecked().allAspects;

    angular.forEach(terms, function(goTerm){
      if (aspectMap && aspectMap[goTerm.aspect]) { //TODO remove when service has correct aspect
          goTerm.aspect = aspectMap[goTerm.aspect];
      }
      totalCheckedAfterMerge += mergedTerms[goTerm.aspect].terms[goTerm.id] ? 0 : 1;
      mergedTerms[goTerm.aspect].terms[goTerm.id] = goTerm;
    });

    return {mergedTerms: mergedTerms, totalChecked: totalCheckedAfterMerge}
  };

  var getEffectiveTotalCheckedAndMergedTerms = function(terms, aspectMap) {
    /*var mergedTermsAndTotal = getMergedTermsAndTotal(terms, aspectMap);
    var totalCheckedAfterHandlingError = limitChecker.getTotalCheckedAfterHandlingLimitError($scope.getTotalChecked().allAspects,
        mergedTermsAndTotal.totalChecked, $scope.uploadLimitGO);
    if (limitChecker.isTotalDifferent(mergedTermsAndTotal.totalChecked, totalCheckedAfterHandlingError)) {
      return {mergedTerms: $scope.selection, totalChecked: $scope.getTotalChecked().allAspects};
    } else {
      return mergedTermsAndTotal;
    } */
  };

  var updateSelectionAndTotal = function(terms, aspectMap) {
    var effectiveMergedTerms = getEffectiveTotalCheckedAndMergedTerms(terms, aspectMap);
    $scope.selection = effectiveMergedTerms.mergedTerms;
    $scope.getTotalChecked().allAspects = effectiveMergedTerms.totalChecked;
  };

  // Predefined sets
  $scope.addPredefined = function() {
    $rootScope.cleanErrorMessages();

    //TODO this is needed as the service currently returns aspect name not id
    var aspectMap = {};
    angular.forEach($scope.aspects, function(aspect) {
      aspectMap[aspect.name] = aspect.id;
    });

    var terms = $scope.selectedPreDefinedSlimSet.associations;
    if(!$scope.includeRootTerms) {
      terms = filterService.removeRootTerms(terms);
    }

    updateSelectionAndTotal(terms, aspectMap);
    $scope.selectedPreDefinedSlimSet = '';
  };

  var separateGOTerms = function(terms) {
    var separated = {obsolete: [], active: {}};
    angular.forEach(terms, function(term) {
      if (term.isObsolete) {
          separated.obsolete.push(term.id);
      } else {
        if (!separated.active[term.aspect]) {
          separated.active[term.aspect] = [];
        }
        separated.active[term.aspect].push(term);
      }
    });
    return separated;
  };

  var updateGOSelection = function(termsByAspect) {
    angular.forEach($scope.selection, function (aspect, aspectId) {
      aspect.terms = limitChecker.getMergedItems(aspect.terms, termsByAspect[aspectId], $scope.uploadLimitGO);
    });
  };

  // Own terms     GO:0006915,dsfd,GO:0006916,GO:0004200
  $scope.addOwnTerms = function() {
    $rootScope.cleanErrorMessages();

    var goterms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms.toUpperCase());
    var validatedTerms = filterService.validateItems(goterms, validationService.validateGOTerm);
    $rootScope.stackErrors(validatedTerms.invalidItems, 'alert', 'is not a valid GO term id');

    termService.getGOTerms(_.pluck(validatedTerms.validItems, 'id')).then(function(d) {
      var separated = separateGOTerms(d.data.results);
      $rootScope.stackErrors(separated.obsolete, 'warning', 'is obsolete');
      updateGOSelection(separated.active);
      console.log($scope.selection);
    });
    $scope.slimOwnTerms = '';
  };

  //Basket terms
  $scope.addBasketTerms = function() {
    $rootScope.cleanErrorMessages();
    var items = _.filter($scope.basketList, function(d) {
      return d.selected;
    });
    updateSelectionAndTotal(items);
  };

  //taxons
  $scope.addNewTaxon = function() {
    $rootScope.cleanErrorMessages();

    taxonomyService.addNewTaxa($scope.species, $scope.taxonTextArea, $scope.totalTaxon, $scope.uploadLimitTaxon)
      .then(function(data) {
        $scope.species = data.taxa;
        $scope.totalTaxon = data.totalChecked;
        $scope.taxonTextArea = '';
    });
  };

  $scope.addGPIds = function(){
    $rootScope.cleanErrorMessages();

    var ids = stringService.getTextareaItemsAsArray($scope.geneProductID);
    angular.forEach(ids, function(id) {
      if(validationService.validateGeneProduct(id)){
        $scope.additionalSelection.gpIds.push(id);
      }
    });

    $scope.geneProductID = '';
  };

  $scope.addTaxons = function(){
    $scope.additionalSelection.taxa = _.pluck(_.filter($scope.species, 'checked'),'id');
  };

  var cleanWhenEmpty = function() {
    if ($scope.getTotalChecked().allAspects === 0) {
      $scope.deSelectedItems = [];
    }
  };

  $scope.removeFromSelection = function(termToRemove) {
    $rootScope.cleanErrorMessages();
    // Remove from selected items
    delete $scope.selection[termToRemove.aspect].terms[termToRemove.id];
    // Add to de-selected items
    $scope.deSelectedItems.push(termToRemove);
    cleanWhenEmpty();
  };

  $scope.addBackIntoSelection = function(termToAdd) {
    $rootScope.cleanErrorMessages();
    // Add back to selectedItems
      /*
    var totalCheckedAfterHandlingError = limitChecker.getTotalCheckedAfterHandlingLimitError($scope.getTotalChecked().allAspects,
      $scope.getTotalChecked().allAspects + 1, $scope.uploadLimitGO);
    if (limitChecker.isTotalDifferent($scope.getTotalChecked().allAspects, totalCheckedAfterHandlingError)) {
        $scope.selection[termToAdd.aspect].terms[termToAdd.id] = termToAdd;
        // Remove from deSelectedItems
        $scope.deSelectedItems = _.filter($scope.deSelectedItems, function(term) {
            return term.id !== termToAdd.id;
        });
    }   */
  };

  $scope.viewAnnotations = function() {
    $rootScope.cleanErrorMessages();
    $location.search('goUsage', 'slim');
    $location.search('goUsageRelationships', 'is_a,part_of,occurs_in');

    var allTerms = $scope.getSelectedIds();
    $location.search('goId', allTerms.join(','));

    // Add gene products
    if ($scope.additionalSelection.gpIds.length > 0) {
      $location.search('geneProductId', $scope.additionalSelection.gpIds.toString());
    }

    // Add taxons
    if ($scope.additionalSelection.taxa.length > 0) {
      $location.search('taxonId', $scope.additionalSelection.taxa.toString());
    }

    $location.path('annotations');
  };

  $scope.clearSelection = function() {
    $rootScope.cleanErrorMessages();
    init();
    $scope.deSelectedItems = [];
  };

  $scope.getSelectedIds = function() {
    var ids = [];
    angular.forEach($scope.selection, function(aspect) {
      ids = ids.concat(_.pluck(aspect.terms, 'id'));
    });
    return ids;
  };

  $scope.getSelectedIdsForAspect = function(aspect){
    return _.pluck($scope.selection[aspect].terms, 'id');
  };

  $scope.updateTotalCheckedTaxaOnChange = function(term) {
    /*$rootScope.cleanErrorMessages();
    var currentTotalCheck = limitChecker.getAllChecked($scope.species).length;
    $scope.totalTaxon = limitChecker.getTotalCheckedAfterHandlingLimitError(
      limitChecker.getAllChecked($scope.species).length, limitChecker.getAllChecked($scope.species).length,
      $scope.uploadLimitTaxon);
    term.checked = limitChecker.isTotalDifferent(currentTotalCheck, $scope.totalTaxon) ? !term.checked : term.checked;*/
  };

  $scope.getTotalChecked = function() {
    $scope.totalPerAspect = {};
    $scope.totalPerAspect.allAspects = 0;
    angular.forEach($scope.aspects, function(aspect) {
      $scope.totalPerAspect[aspect.id] = $scope.selection[aspect.id].terms.length;
      $scope.totalPerAspect.allAspects += $scope.totalPerAspect[aspect.id];
    });
    return $scope.totalPerAspect;
  };
});
