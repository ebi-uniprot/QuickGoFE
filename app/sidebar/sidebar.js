/**
 * Created by twardell on 17/04/2015.
 */
app.controller('SidebarCtrl', function($rootScope, $scope, $location, filteringService, hardCodedDataService, $routeParams) {


  $scope.showInitialTaxons=1;
  $scope.showCommonTaxons=0;

  //Entities to hold the quick filters values entered into the sidebar.
  $scope.quickFilters = {};
  $scope.quickFilters.text = {};
  $scope.quickFilters.text.goID = "";
  $scope.quickFilters.text.gpID = "";

  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
  $scope.initialTaxonomies = hardCodedDataService.getInitialTaxonomies();

  $scope.displayStats = $location.path().lastIndexOf('statistics') > 0;
  console.log($scope.displayStats);


  /**
   * ------------------------------------------------ Scope methods  -------------------------------------------------
   */

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.quickFilterById = function(){

    console.log("[annotationSidebar.js] quickFilterById ",$scope.quickFilters);

    //Save the quick filter values
    filteringService.populateQuickFilters($scope.quickFilters);

    //Clear the content of the quickFilters
    $scope.quickFilters.text.goID = "";
    $scope.quickFilters.text.gpID = "";

    //Tell parent page this value has been updated.

    $scope.$emit('filtersUpdate', $scope.quickFilters);   //todo change this so is notification only

    $location.path("/annotations");

  }


  $scope.quickTax = function(taxId){

    console.log("AnnotationSidebar.js - quickTax", taxId);

    var aFilter = {type: 'taxon', value: taxId};

    if(filteringService.hasFilter(aFilter)){
      filteringService.removeFilter(aFilter);
    }else{
      filteringService.saveAppliedFilter(aFilter);
    }

    //Tell parent page this value has been updated.
    $scope.$emit('filtersUpdate', '');   //todo change this so is notification only

  }

  /**
   * Remove filter from applied filters
   * @param filter
   */
  $scope.removeFilter=function(filter) {

    filteringService.removeFilter(filter);

    //send an update to the annotation list to refresh itself
    $scope.$emit('filtersUpdate', filter);

  };


  /**
   * Remove ALL applied filters
   * @param filter
   */
  $scope.clearFilters=function() {
    filteringService.clearFilters();

    //send an update to the annotation list to refresh itself
    $scope.$emit('filtersClear');
  };



  /**
   * Show the common taxons used for filtering
   * @param taxon
   * @param showAll
   * @returns {boolean}
   */
  $scope.showCommonTaxon=function(taxon, showAll){

    if($scope.showAll==="" || $scope.showAll==='false')
    {
      //Only show selected
      return (taxon.taxId=='9606'|taxon.taxId=='10090'|taxon.taxId=='10116');
    }
    return true;
  };



  $scope.showMore = function(){
    $scope.showInitialTaxons=0;
    $scope.showCommonTaxons=1;
  }

  $scope.showLess = function(){
    $scope.showInitialTaxons=1;
    $scope.showCommonTaxons=0;
  }

$scope.annotationDisplayType = function(toDisplay) {
    console.log("starting nav");
    $('#bioView').hide();
    $('#tabView').hide();
    $('#'+toDisplay).show();
  }

});
