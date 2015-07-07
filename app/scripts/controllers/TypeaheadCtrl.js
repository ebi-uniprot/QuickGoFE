/**
 * Created by twardell on 06/07/2015.
 */

angular.module('quickGoFeApp').controller('TypeaheadCtrl', function ($scope, $http, targetDomainAndPort) {

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

});
