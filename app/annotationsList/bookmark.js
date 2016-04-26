/**
 * Created by twardell on 09/05/2015.
 */
app.controller('BookmarkCtrl', function($scope, $routeParams,  $location, filteringService) {

  filteringService.clearFilters();
  angular.forEach($routeParams, function(val, type){
      if(type === 'id') {
        var isGoTerm = val.indexOf("GO");
        if(isGoTerm >= 0){
          filteringService.addFilter('goID', val, true);
      	} else {
          filteringService.addFilter('ecoID', val, true);
      	}
      } else if(val.split(",").length > 0){
        angular.forEach(val.split(','), function(value){
          filteringService.addFilter(type,value,true)
        });
      } else {
        filteringService.addFilter(type, val, true);
      }
  });

  //Go to annotation list page
  $location.url('annotations');
});
