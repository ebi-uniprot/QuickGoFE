/**
 * Created by twardell on 17/04/2015.
 */
app.controller('AnnotationSidebarCtrl', function($scope, filteringService, hardCodedDataService, feDomainAndPort) {


  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();

  $scope.bookmarkableLink = feDomainAndPort+"/#/annotations";


  /**
   * ------------------------------------------------ Scope methods  -------------------------------------------------
   */

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.submit = function(advancedFilters){

    console.log("AnnotationSidebar.js -  advanced filters", advancedFilters);

    filteringService.populateAppliedFilters(advancedFilters,0); //0==not a slim

    $scope.bookmarkableLink = feDomainAndPort+"/#/bookmark/"+filteringService.createBookmarkableString();

    //Tell parent page this value has been updated.

    $scope.$emit('filtersUpdate', advancedFilters);   //todo change this so is notification only

  }


  $scope.quickTax = function(taxId){

    console.log("AnnotationSidebar.js - quickTax", taxId);

    var aFilter = {type: 'taxonomyId', value: taxId};

    if(filteringService.hasFilter(aFilter)){
      filteringService.removeFilter(aFilter);
    }else{
      filteringService.saveAppliedFilter(aFilter);
    }

    //Check to see if this combination is in the advancedFilters list
    // - if not, add it.
    // - if so, remove it.


    //filteringService.populateAppliedFilters(advancedFilters,0); //0==not a slim
    //
    $scope.bookmarkableLink = feDomainAndPort+"/#/bookmark/"+filteringService.createBookmarkableString();
    //
    //Tell parent page this value has been updated.

    $scope.$emit('filtersUpdate', '');   //todo change this so is notification only

  }

  /**
   * Remove filter from applied filters
   * @param filter
   */
  $scope.removeFilter=function(filter) {

    filteringService.removeFilter(filter);

    $scope.bookmarkableLink = feDomainAndPort+"/#/bookmark/"+filteringService.createBookmarkableString();

    //send an update to the annotation list to refresh itself
    $scope.$emit('filtersUpdate', filter);

  };


  /**
   * Remove ALL applied filters
   * @param filter
   */
  $scope.clearFilters=function() {

    filteringService.clearFilters();

    $scope.bookmarkableLink = feDomainAndPort+"/#/annotations";

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


  });
