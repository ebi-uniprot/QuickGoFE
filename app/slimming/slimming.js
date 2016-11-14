'use strict';
app.controller('GOSlimCtrl', function($scope, $location,
  hardCodedDataService, presetsService, termService, basketService,
  stringService) {

  $scope.selection = {};

  var init = function() {
    angular.forEach($scope.aspects, function(aspect) {
      $scope.selection[aspect.id] = {
        'name': aspect.name,
        'terms': {}
      };
    });

    $scope.selectedSpecies = {};

    $scope.species = hardCodedDataService.mostCommonTaxonomies;

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

  // $scope.rootTermMFID = 'GO:0003674';
  // $scope.rootTermBPID = 'GO:0008150';
  // $scope.rootTermCCID = 'GO:0005575';

  presetsService.getPresets().then(function(d) {
    $scope.geneProducts = d.data.geneProducts;
    $scope.predefinedSlimSets = d.data.goSlimSets;
    $scope.aspects = d.data.aspects;
    init();
  });

  // Predefined sets
  $scope.addPredefined = function() {
    console.log($scope.selectedPreDefinedSlimSet.associations);
    termService.getGOTerms($scope.selectedPreDefinedSlimSet.associations).then(function(d){
      angular.forEach(d.data.results, function(goTerm){
        $scope.selection[goTerm.aspect].terms[goTerm.id] = goTerm;
      });
    });

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

  $scope.getTotalCount = function() {
    return $scope.selectedItems;
  };

  $scope.removeFromSelection = function(termId) {
    // Remove from selected items
    $scope.selectedItems = _.filter($scope.selectedItems, function(term) {
      return term.termId !== termId;
    });
    // Add to de-selected items
    termService.getGOTerm(termId).then(function(res) {
      $scope.deSelectedItems.push(res.data);
    });
  };

  $scope.addBackIntoSelection = function(termId) {
    // Remove from deSelectedItems
    $scope.deSelectedItems = _.filter($scope.deSelectedItems, function(term) {
      return term.termId !== termId;
    });
    // Add back to selectedItems
    termService.getGOTerm(termId).then(function(res) {
      $scope.selectedItems.push(res.data);
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

  /**
   * Save the entered information and use it to filter the results on the annotation list page,
   * which we will forward to now
   */
  $scope.viewAnnotations = function() {

    $location.search('goUsage', 'slim');
    $location.search('goUsageRelationships', 'is_a,part_of,occurs_in');

    console.log($scope.selection);
    var allTerms = [];
    angular.forEach($scope.selection, function(aspect) {
      allTerms = allTerms.concat(_.pluck(aspect.terms, 'id'));
    });
    console.log(allTerms);
    $location.search('goId', allTerms.join(','));

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
    $location.path('annotations');
  };

  $scope.clearSelection = function() {
    init();
  };

});
