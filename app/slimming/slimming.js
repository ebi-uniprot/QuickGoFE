'use strict';
app.controller('GOSlimCtrl', function($scope, $location, $q,
  hardCodedDataService, presetsService, $document, termService, basketService,
  stringService, validationService, filterService, taxonomyService, $rootScope, limitChecker) {

  $scope.selection = {};
  $scope.totalPerAspect = {};
  $scope.deSelectedItems = [];
  $scope.uploadLimitGO = hardCodedDataService.getServiceLimits().goId;
  $scope.uploadLimitTaxon = hardCodedDataService.getServiceLimits().taxonId;

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
    $scope.taxa = [];
    taxonomyService.initTaxa($scope.taxa).then(function(data) {
      $scope.taxa = data.taxa;
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

  var getActivesInTempGOSelection = function(termsByAspect) {
    var tempSelection= {};
    angular.forEach($scope.aspects, function(aspect) {
      tempSelection[aspect.id] = {
        'name': aspect.name,
        'terms': []
      };
    });
    var totalAfterMerge = 0;
    angular.forEach($scope.selection, function (aspect, aspectId) {
      tempSelection[aspectId].terms = limitChecker.getMergedAllItems(aspect.terms, termsByAspect[aspectId]);
      totalAfterMerge += tempSelection[aspectId].terms.length;
    });
    return {selection: tempSelection, totalSelection: totalAfterMerge};
  };

  var validateLimitAndUpdateSelection = function(tempSelection) {
    if (tempSelection.totalSelection <= $scope.uploadLimitGO) {
      $scope.selection = tempSelection.selection;
    } else {
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimitGO));
    }
  };

  var updateGOSelection = function(terms) {
    var separated = separateGOTerms(terms);
    $rootScope.stackErrors(separated.obsolete, 'warning', 'is obsolete');
    validateLimitAndUpdateSelection(getActivesInTempGOSelection(separated.active));
  };

  var cleanWhenEmpty = function() {
    if ($scope.getTotalGOChecked().allAspects === 0) {
      $scope.deSelectedItems = [];
    }
  };

  $scope.getTotalGOChecked = function() {
    $scope.totalPerAspect = {};
    $scope.totalPerAspect.allAspects = 0;
    angular.forEach($scope.aspects, function(aspect) {
      $scope.totalPerAspect[aspect.id] = $scope.selection[aspect.id].terms.length;
      $scope.totalPerAspect.allAspects += $scope.totalPerAspect[aspect.id];
    });
    return $scope.totalPerAspect;
  };

  $scope.removeFromSelection = function(termToRemove) {
    $rootScope.cleanErrorMessages();
    $scope.selection[termToRemove.aspect].terms = _.reject($scope.selection[termToRemove.aspect].terms, function (term){
      return term.id === termToRemove.id;
    });
    $scope.deSelectedItems.push(termToRemove);
    cleanWhenEmpty();
  };

  $scope.addBackIntoSelection = function(termToAdd) {
    $rootScope.cleanErrorMessages();
    $scope.selection[termToAdd.aspect].terms.push(termToAdd);
    $scope.deSelectedItems = _.reject($scope.deSelectedItems, function (term) {
      return term.id === termToAdd.id;
    });
  };

  // Predefined sets
  $scope.addPredefined = function() {
    $rootScope.cleanErrorMessages();
    var terms = $scope.selectedPreDefinedSlimSet.associations;
    if(!$scope.includeRootTerms) {
      terms = filterService.removeRootTerms(terms);
    }
    updateGOSelection(terms);
    $scope.selectedPreDefinedSlimSet = '';
  };

  // Own terms     GO:0006915,dsfd,GO:0006916,GO:0004200
  $scope.addOwnTerms = function() {
    $rootScope.cleanErrorMessages();
    var goterms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms.toUpperCase());
    var validatedTerms = filterService.validateItems(goterms, validationService.validateGOTerm);
    $rootScope.stackErrors(validatedTerms.invalidItems, 'alert', 'is not a valid GO term id');
    termService.getGOTerms(_.pluck(validatedTerms.validItems, 'id')).then(function(d) {
      updateGOSelection(d.data.results);
    });
    $scope.slimOwnTerms = '';
  };

  //Basket terms
  $scope.basketItemsSelected = function() {
    return _.any(_.pluck($scope.basketList, 'selected'));
  };

  $scope.addBasketTerms = function() {
    $rootScope.cleanErrorMessages();
    var items = _.filter($scope.basketList, function(d) {
      return d.selected;
    });
    updateGOSelection(items);
  };

  //taxons
  $scope.addNewTaxon = function() {
    $rootScope.cleanErrorMessages();

    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea, $scope.getTotalTaxonChecked(), $scope.uploadLimitTaxon)
      .then(function(data) {
        $scope.taxa = data.taxa;
        $scope.taxonTextArea = '';
    });
  };

  $scope.addTaxons = function(){
    $scope.additionalSelection.taxa = _.pluck(_.filter($scope.taxa, 'checked'),'id');
  };

  $scope.selectTaxon = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.taxa), $scope.uploadLimitTaxon)) {
      _.find($scope.taxa, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimitTaxon));
    }
  };

  $scope.getTotalTaxonChecked = function() {
    return limitChecker.getAllChecked($scope.taxa).length;
  };

  //GPIds
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
});
