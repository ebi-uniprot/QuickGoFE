/**
 * Created by twardell on 09/05/2015.
 */
app.controller('BookmarkCtrl', function($scope, $location,  $window, filteringService,
                                        $rootScope, $http, $log, basketService,
                                        hardCodedDataService, ENV) {

  console.log("In the bookmark controller");
  console.log("The path we arrived here with is", $location.path())

  //The raw list of filters as they come back from the advanced filters modal
  var advancedFilters = [];
  //advancedFilters.text = {};

  // Parse the query parameters and forward to the annotation page after populating the filtering service values
  // It will be something like http://localhost:9000/#/bookmark/taxonomyId:9606,

  /*Parse the url to get the filter parameters*/
  var pathVals =$location.path().split("/");
  var filterParms=pathVals[(pathVals.length-1)];
  //console.log("filter parms", filterParms);

  var args = filterParms.split(",");

  var i=-1;
  for(i=0;i<args.length;i++) {

    var singleArg = args[i];

    if (singleArg != '') {
      //console.log(singleArg);
      var components = singleArg.split(":");
      var aFilter = {type: components[0], value: components[1]};
      //console.log("Bookmark.js -created aFilter", aFilter);
      advancedFilters.push(aFilter);
    }

  }

  //Save the passed in parameters to the
  filteringService.simpleAppliedFilters(advancedFilters,0); //0==not a slim

  //Go to annotation list page
  console.log("Forwarding to the annotations page");
  window.location.href= "#/annotations/";


});
