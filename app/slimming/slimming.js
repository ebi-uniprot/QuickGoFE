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
    var taxa = 
        
        DataService.getMostCommonTaxonomies();
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

  var getEstimatedSelection = function(terms, aspectMap) {
    var estimatedTotal = $scope.total;
    var estimatedSelection = {};
    angular.forEach($scope.aspects, function(aspect) {
        estimatedSelection[aspect.id] = {
            'name': aspect.name,
            'terms': _.extend({}, $scope.selection[aspect.id].terms)
        };
    });

    angular.forEach(terms, function(goTerm){
      if (aspectMap && aspectMap[goTerm.aspect]) { //TODO remove when service has correct aspect
          goTerm.aspect = aspectMap[goTerm.aspect];
      }
      estimatedTotal += estimatedSelection[goTerm.aspect].terms[goTerm.id] ? 0 : 1;
      estimatedSelection[goTerm.aspect].terms[goTerm.id] = goTerm;
    });

    return {total: estimatedTotal, selection: estimatedSelection};
  };

  var updateSelection = function(terms, aspectMap) {
      var estimated = getEstimatedSelection(terms, aspectMap);
      if (estimated.total > $scope.uploadLimit) {
          $rootScope.alerts = [hardCodedDataService.getTermsLimitMsg($scope.uploadLimit)];
      } else {
          $scope.total = estimated.total;
          $scope.selection = estimated.selection;
          $rootScope.alerts = [];
      }
  };

  // Predefined sets
  $scope.addPredefined = function() {
    //TODO this is needed as the service currently returns aspect name not id
    var aspectMap = {};
    angular.forEach($scope.aspects, function(aspect) {
      aspectMap[aspect.name] = aspect.id;
    });

    var terms = $scope.selectedPreDefinedSlimSet.associations;
    if(!$scope.includeRootTerms) {
      terms = filterService.removeRootTerms(terms);
    }

    updateSelection(terms, aspectMap);
    $scope.selectedPreDefinedSlimSet = '';
  };


  // Own terms
  $scope.addOwnTerms = function() {
    var terms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms);
    termService.getGOTerms(terms).then(function(d){
      updateSelection(d.data.results);
    });
    $scope.slimOwnTerms = '';
  };

  //Basket terms
  $scope.addBasketTerms = function() {
    var items = _.filter($scope.basketList, function(d) {
      return d.selected;
    });
    updateSelection(items);
  };

  //taxons
  $scope.addNewTaxon = function() {
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
    $rootScope.alerts = [];
    $scope.taxonTextArea = '';
  };

  $scope.addGPIds = function(){
    var ids = stringService.getTextareaItemsAsArray($scope.geneProductID);
    angular.forEach(ids, function(id) {
      if(validationService.validateGeneProduct(id)){
        $scope.additionalSelection.gpIds.push(id);
      }
    });
    $rootScope.alerts = [];
    $scope.geneProductID = '';
  };

  $scope.addTaxons = function(){
    $scope.additionalSelection.taxa = _.pluck(_.filter($scope.species, 'checked'),'taxId');
  };

  $scope.removeFromSelection = function(termToRemove) {
    // Remove from selected items
    delete $scope.selection[termToRemove.aspect].terms[termToRemove.id];
    $scope.total--;
    $rootScope.alerts = [];
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
        $rootScope.alerts = [];

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

    $rootScope.alerts = [];
    $location.path('annotations');
  };

  $scope.clearSelection = function() {
    init();
    $scope.deSelectedItems = [];
    $rootScope.alerts = [];
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
