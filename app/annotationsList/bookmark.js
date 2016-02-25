/**
 * Created by twardell on 09/05/2015.
 */
app.controller('BookmarkCtrl', function($scope, $routeParams,  $location, filteringService) {

  filteringService.clearFilters();
  var advancedFilters = [];

  angular.forEach($routeParams, function(val, type){
      if(type === 'id') {
      	if(val.startsWith('GO:')) {
          filteringService.saveValuesAsFilter('goID', val);
      	} else if (val.startsWith('ECO:')) {
          filteringService.saveValuesAsFilter('ecoID', val);
      	}
      } else {
        filteringService.saveValuesAsFilter(type, val);        
      }
  });


  //Go to annotation list page
  $location.path('/annotations');
});
