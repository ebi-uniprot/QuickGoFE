'use strict';
app.controller('GOSlimCtrl', function($scope, $location, $q,
  hardCodedDataService, presetsService, $document, termService, basketService,
  stringService, validationService, filterService, $rootScope) {

  $scope.selection = {};
  $scope.deSelectedItems = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().goId;
  $scope.total = 0;

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
    angular.forEach($scope.aspects, function(aspect) {
      $scope.selection[aspect.id] = {
        'name': aspect.name,
        'terms': {}
      };
    });
    $scope.total = 0;

    $scope.additionalSelection = {
      'gpIds':[],
      'taxa':[]
    };
    $scope.species = {};
    var taxa = hardCodedDataService.getMostCommonTaxonomies();
    angular.forEach(taxa, function(taxon) {
      taxon.checked = false;
      $scope.species[taxon.taxId] = taxon;
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
    $rootScope.cleanErrorMessages();
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
    var mergedTerms = jQuery.extend(true, {}, $scope.selection);
    var totalCheckedAfterMerge = $scope.total;

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
    var mergedTermsAndTotal = getMergedTermsAndTotal(terms, aspectMap);
    var totalCheckedAfterHandlingError = $rootScope.getTotalCheckedAfterHandlingLimitError($scope.total,
        mergedTermsAndTotal.totalChecked, $scope.uploadLimit);
    if ($rootScope.isTotalDifferent(mergedTermsAndTotal.totalChecked, totalCheckedAfterHandlingError)) {
      return {mergedTerms: $scope.selection, totalChecked: $scope.total};
    } else {
      return mergedTermsAndTotal;
    }
  };

  var updateSelectionAndTotal = function(terms, aspectMap) {
    var effectiveMergedTerms = getEffectiveTotalCheckedAndMergedTerms(terms, aspectMap);
    $scope.selection = effectiveMergedTerms.mergedTerms;
    $scope.total = effectiveMergedTerms.totalChecked;
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


  // Own terms
  $scope.addOwnTerms = function() {
    $rootScope.cleanErrorMessages();

    var terms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms);
    termService.getGOTerms(terms).then(function(d){
      updateSelectionAndTotal(d.data.results);
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

    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    angular.forEach(taxons, function(taxonId) {
      if (validationService.validateTaxon(taxonId)) {
        if($scope.species[taxonId]) {
          $scope.species[taxonId].checked = true;
        } else {
          $scope.species[taxonId] = {
            taxId: taxonId,
            title: '',
            checked: true
          };
        }
      }
    });

    $scope.taxonTextArea = '';
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
    $scope.additionalSelection.taxa = _.pluck(_.filter($scope.species, 'checked'),'taxId');
  };

  $scope.removeFromSelection = function(termToRemove) {
    // Remove from selected items
    delete $scope.selection[termToRemove.aspect].terms[termToRemove.id];
    $scope.total--;
    $rootScope.cleanErrorMessages();
    // Add to de-selected items
    $scope.deSelectedItems.push(termToRemove);
  };

  $scope.addBackIntoSelection = function(termToAdd) {
    // Add back to selectedItems
    if (($scope.total + 1) > $scope.uploadLimit) {
        $rootScope.alerts = [hardCodedDataService.getTermsLimitMsg($scope.uploadLimit)];
    } else {
        $scope.selection[termToAdd.aspect].terms[termToAdd.id] = termToAdd;
        $scope.total++;
        $rootScope.cleanErrorMessages();

        // Remove from deSelectedItems
        $scope.deSelectedItems = _.filter($scope.deSelectedItems, function(term) {
            return term.id !== termToAdd.id;
        });
    }
  };

  $scope.$watch('selection', function() {
    $scope.count = {
      total:0
    };
    angular.forEach($scope.selection, function(aspect) {
      if(Object.keys(aspect.terms).length) {
        $scope.count[aspect.name] = Object.keys(aspect.terms).length;
        $scope.count.total = $scope.count.total + Object.keys(aspect.terms).length;
      }
    });
  }, true);

  $scope.viewAnnotations = function() {
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

    $rootScope.cleanErrorMessages();
    $location.path('annotations');
  };

  $scope.clearSelection = function() {
    init();
    $scope.deSelectedItems = [];
    $rootScope.cleanErrorMessages();
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

});
