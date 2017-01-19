'use strict';
app.controller('GOSlimCtrl', function($scope, $location, $q,
  hardCodedDataService, presetsService, termService, basketService,
  stringService, validationService) {

  $scope.selection = {};
  $scope.deSelectedItems = [];



  function sticky_relocate() {
    console.log("s-r.2");
      var window_top = $(window).scrollTop();
      if (document.getElementById('sticky-anchor')) {
      var div_top = $('#sticky-anchor').offset().top;
    }
      console.log(div_top);
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

    if($scope.includeRootTerms) {
      termService.getGOTerms(['GO:0003674','GO:0008150','GO:0005575']).then(function(d){
        angular.forEach(d.data.results, function(goTerm){
          $scope.selection[goTerm.aspect].terms[goTerm.id] = goTerm;
        });
      });
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
