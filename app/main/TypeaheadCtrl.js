/**
 * Created by twardell on 06/07/2015.
 */

angular.module('quickGoFeApp').controller('TypeaheadCtrl', function ($scope, $http, targetDomainAndPort, filteringService,
                                            $location, $rootScope) {

  $scope.searchText='';

  //var url = targetDomainAndPort + '/ws/searchfull';
  //var url = targetDomainAndPort + '/search?query=' + JSON.stringify(map) + "&isProtein=false

  //  $scope.provideSuggestions = function(val){
  //    searchfull.query({text: val, page: 1, rows: 5}, function (result) {
  //
  //      console.log("found suggested values data ", result);
  //      //$scope.asyncSelected = result.
  //      return result.searchResults;
  //    });
  //
  //};


  //wsService.factory('searchfull', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  //  return $resource(targetDomainAndPort+'/ws/searchfull', {text: '@text',format:'JSON', page:'@page', row:'@rows', viewBy:'@viewBy'}, {
  //    query: {method:'GET'}
  //  });
  //}]);

  $scope.provideSuggestions = function(val) {

    //var url = targetDomainAndPort + '/search?query=' + val + '&isProtein=false';
    var url = targetDomainAndPort + '/searchTypeAhead';


    return $http.get(url, {
      params: {
        query: val,
      }
    }).then(function(response){

      console.log(response);

      //return response.data.results.map(function(item){
      //  return item.formatted_address;
      //});
      return response.data;

    });
  };

  /**
   * Forward to the search result page.
   * @param searchTerm
   */
  $scope.showSearchResults = function (searchTerm) {

    console.log("forwarding to search results");
    $location.path("/search/"+searchTerm);

  }


  /**
   * If a value is selected from the typeahead list decide if things should happen.
   */

  $scope.onSelect = function ($item, $model, $label) {

    console.log("on select item", $item);
    console.log("on select model", $model);

    console.log("on select label", $label);

    $scope.$item = $item;
    $scope.$model = $model;
    $scope.$label = $label;

    if($item.type=="GENE_PRODUCT"){

      //Use the id of the gene product to filter the annotation list
      var aFilter = {type: 'gpID', value: $item.key};
      filteringService.saveAppliedFilter(aFilter);

      //Tell the annotation list the filters have changed
      $rootScope.$emit('filtersUpdate', {});   //todo change this so is notification only

      //Clear the entered search text
      $scope.searchText ='';

    }
  };
});
