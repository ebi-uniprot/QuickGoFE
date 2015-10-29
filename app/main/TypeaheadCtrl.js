/**
 * Created by twardell on 06/07/2015.
 */

angular.module('quickGoFeApp').controller('TypeaheadCtrl', function ($scope, $http, filteringService,
                                            $location, $rootScope, ENV) {

  $scope.searchText='';

  $scope.provideSuggestions = function(val) {

    var url = ENV.apiEndpoint + '/searchTypeAhead';


    return $http.get(url, {
      params: {
        query: val,
      }
    }).then(function(response){

      console.log(response);

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

    //Clear the entered search text
    $scope.searchText ='';

    if($item.type=="GENE_PRODUCT"){

      //Use the id of the gene product to filter the annotation list
      var aFilter = {type: 'gpID', value: $item.key};
      filteringService.saveAppliedFilter(aFilter);

      //Tell the annotation list the filters have changed
      $rootScope.$emit('filtersUpdate', {});   //todo change this so is notification only

      $location.path("/annotations");

    }

    if($item.type=="TERM"){

      console.log("forward to term");
      $location.path("/term/"+ $item.key); // path not hash

    }
  };
});
