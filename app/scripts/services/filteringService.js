/**
 * Created by twardell on 09/03/2015.
 *
 * This service is the repository of parameters for filtering on the annotation list page.
 * The contents are a list of things by which the annotation page is being  filtered.
 * The inputs from this service are the sidebar on the annotation page itself, or the 'Advanced Filtering' modal
 * available from the annotation list page.
 * The annotation list controller and statistics controller  should make a call to this service before it does anything
 * to find out what filters have been specified.
 *
 * This service will hold a list of records with 3 attributes
 * TYPE: this corresponds to the tab heading on the advanced filtering modal
 * KEY:  the checkbox or text name etc
 * VALUE: true, id and so on to identify the filtering value.
 */


var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function() {

  var filteringService = {};
  var filters = [];


  filteringService.setFilters = function (filterList){
    filters=filterList;
    console.log("Creating filters list", filters)
  }

  filteringService.getFilters = function(){
    return filters;
  }

  /**
   * Create
   */
  filteringService.toQueryString = function(){
    console.log("Building Query String", filters);

    var queryString = '';
    if(filters.dbObjectID != undefined) {
      queryString = queryString + filters.dbObjectID;
    }
  }


  /**
   * ---------------------------------------- Processing Filter Requests ---------------------------------------
   */

  /**
   * Parse the content of the applied filters model supplied form the advanced filters modal and form.
   * //todo get rid of the quotes required around individual values. These have to be in there to make stuff work
   */
  filteringService.populateAppliedFilters = function(data){
    //var appliedFilters = [];

    console.log("Has own data", data);

    for(var inputType in data) {

      if (data.hasOwnProperty(inputType)) {
        console.log("Input type", inputType);

        //Don't process the following
        //Input fields; text area etc
        if (inputType == 'ignore') {
          continue;
        }

        //Input fields; text area etc
        if (inputType == 'text') {

          var anInputType = data[inputType];
          console.log("An Input type", anInputType);

          //parse content
          for (var property in anInputType) {

            if (anInputType.hasOwnProperty(property)) {

              console.log("Has own proerty", property);
              var values = anInputType[property];
              var res = values.split("\n");
              console.log("res",res);
              var i;
              for (i = 0; i < res.length; i++) {

                var aFilter = {type: property, value: res[i]};
                saveAppliedFilter(aFilter);
                //$scope.appliedFilters.push({type: property, value: res[i]});

                //Clear the content of the text box.
                anInputType[property] = "";
              }
            }
          }
        }

        //Checkboxes; radio buttons; select boxes etc
        if (inputType == 'boolean') {

          var anInputType = data[inputType];
          console.log("An Input type", anInputType);

          for (var filtertype in anInputType) {
            if (anInputType.hasOwnProperty(filtertype)) {
              console.log("Has own property", filtertype);

              var filterKeys = anInputType[filtertype];

              console.log("filterKeys", filterKeys);

              for (var aFilterKey in filterKeys) {

                var aFilterValue = filterKeys[aFilterKey];

                //Don't include de-selected values
                if(aFilterValue!=false) {

                  console.log("aFilterValue", aFilterValue);

                  var aFilter = {type: filtertype, value: aFilterValue};
                  saveAppliedFilter(aFilter);
                  //$scope.appliedFilters.push({type: filtertype, value: aFilterValue});
                }else{
                  console.log("Removing filter ", aFilter);
                  var aFilter = {type: filtertype, value: aFilterValue};
                  filteringService.removeFilter(aFilter);
                }
              }
            }
          }
        }

        //Have to deal with drop down selects like this atm.
        if(inputType == 'predefinedSlimSet'){

          var anInputType = data[inputType];
          console.log("An Input type", anInputType);

          var value = anInputType['subset'];
          console.log("A value", value);

          var aFilter = {type: 'subSet', value: value};
          saveAppliedFilter(aFilter);
          //$scope.appliedFilters.push({type: 'subSet', value: value});
        }
      }
    }
  }


  /**
   * Turn the filters into a query string that can be sent to the web service
   * @returns {string}
   */
  filteringService.createQueryString =  function (){

    var queryString='';
    //var queryType='';
    var typeString='';
    for (i = 0  ; i < filters.length; i++) {

      //Always add type
      queryString=queryString + '"' + filters[i].type + '"' + ":";
      queryString=queryString + '"' + filters[i].value + '"' + ',';

    }

    //Place query parameter
    if(queryString.length>0){
      queryString='q='+queryString;

    }

    return queryString;
  }


  /**
   * Remove filter from applied filters
   * @param filter
   */
  filteringService.removeFilter=function(filter) {
    var filterLen = -1;
    var i;

    for (i = 0  ; i < filters.length; i++) {

      if (filters[i].type == filter.type) {

        if (filters[i].value == filter.value) {
          filters.splice(i, 1);

        }
      }
    }
  };

  /**
   *
   */
  filteringService.clearFilters=function(){
    console.log("Clearing filters");
    filters = [];
  };

  /**
   * -------------------------------------------- Non public methods ------------------------------------------
   */

  /**
   * Save the object to applied filters if it doesn't exist already
   */
  function saveAppliedFilter(aFilter){
    console.log('Content of applied Filters is', filters);
    console.log("save applied filter ", aFilter);


    var j=-1;
    var exists=0;
    for(j=0; j<filters.length; j++){

      if(filters[j]=='undefined'){
        continue;
      }

      console.log("what is j",j);

      if(filters[j].type == aFilter.type & filters[j].value == aFilter.value){
        exists=1;
      }
    }


    if(!exists) {
      filters.push(aFilter);
    }

    console.log('Content of applied Filters is now', filters);

  }





  return filteringService;
});
