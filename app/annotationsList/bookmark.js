/**
 * Created by twardell on 09/05/2015.
 */
app.controller('BookmarkCtrl', function($scope, $routeParams,  $location, filteringService) {

  filteringService.clearFilters();
  var advancedFilters = [];

  angular.forEach($routeParams, function(val, key){
      var aFilter = {type: key, value: val};
      advancedFilters.push(aFilter);
  });

  filteringService.simpleAppliedFilters(advancedFilters,0); //0==not a slim

  //Go to annotation list page
  $location.path('/annotations');
});
