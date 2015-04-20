/**
 * Created by twardell on 17/04/2015.
 */
app.controller('AnnotationSidebarCtrl', function($scope, filteringService, hardCodedDataService) {


  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();


  /**
   * ------------------------------------------------ Scope methods  -------------------------------------------------
   */

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.submit = function(advancedFilters){

    console.log("AnnotationSidebar.js -  advanced filters", advancedFilters);

    filteringService.populateAppliedFilters(advancedFilters);

    //Tell parent page this value has been updated.

    $scope.$emit('filtersUpdate', advancedFilters);   //todo change this so is notification only

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


  });
