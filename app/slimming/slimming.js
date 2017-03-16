'use strict';
app.controller('GOSlimCtrl', function($scope, $location, $q,
  hardCodedDataService, presetsService, $document, termService, basketService,
  stringService, validationService, filterService, taxonomyService, $rootScope) {

  $scope.selection = {};
  $scope.deSelectedItems = [];
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

    $scope.additionalSelection = {
      'gpIds':[],
      'taxa':[]
    };
    $scope.species = [];
    taxonomyService.initTaxa($scope.species).then(function(data) {
      $scope.species = data;
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

    angular.forEach(terms, function(term){
      if(aspectMap[term.aspect]) { //TODO remove when service has correct aspect
        term.aspect = aspectMap[term.aspect];
      }
      $scope.selection[term.aspect].terms[term.id] = term;
    });
    $scope.selectedPreDefinedSlimSet = '';
  };

  // Own terms
  $scope.addOwnTerms = function() {
    var terms = stringService.getTextareaItemsAsArray($scope.slimOwnTerms);
    termService.getGOTerms(terms).then(function(d){
      angular.forEach(d.data.results, function(goTerm){
        $scope.selection[goTerm.aspect].terms[goTerm.id] = goTerm;
      });
    });
    $scope.slimOwnTerms = '';
  };

  //Basket terms
  $scope.addBasketTerms = function() {
    var items = _.filter($scope.basketList, function(d) {
      return d.selected;
    });
    angular.forEach(items, function(term) {
      $scope.selection[term.aspect].terms[term.id] = term;
    });
  };

  //taxons
  $scope.addNewTaxon = function() {
    taxonomyService.addNewTaxa($scope.species, $scope.taxonTextArea).then(function(data) {
        $scope.species = data;
        $scope.taxonTextArea = '';
    });
  };

  $scope.addGPIds = function(){
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

  $scope.getTotalCount = function() {
    return $scope.selectedItems;
  };

  $scope.removeFromSelection = function(termToRemove) {
    // Remove from selected items
    delete $scope.selection[termToRemove.aspect].terms[termToRemove.id];
    // Add to de-selected items
    $scope.deSelectedItems.push(termToRemove);
  };

  $scope.addBackIntoSelection = function(termToAdd) {
    // Add back to selectedItems
    $scope.selection[termToAdd.aspect].terms[termToAdd.id] = termToAdd;
    // Remove from deSelectedItems
    $scope.deSelectedItems = _.filter($scope.deSelectedItems, function(term) {
      return term.id !== termToAdd.id;
    });
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

    $location.path('annotations');
  };

  $scope.clearSelection = function() {
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
