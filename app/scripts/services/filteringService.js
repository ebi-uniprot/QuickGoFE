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
  var isSlimRequest = 0;


  filteringService.setFilters = function (filterList){
    filters=filterList;
    //console.log("Creating filters list", filters)
  }

  filteringService.getFilters = function(){
    return filters;
  }

  /**
   * Create //todo is this used?
   */
  filteringService.toQueryString = function(){
    //console.log("Building Query String", filters);

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
  filteringService.populateAppliedFilters = function(data, isSlim){

    var filters = [];
    angular.forEach(data, function(filter, type){
      angular.forEach(filter, function(add, id){
        if(add) {
          filteringService.saveAppliedFilter({type: type, value:id});
        } 
      });
    });
    // return filters;

    // for(var inputType in data) {

    //   if (data.hasOwnProperty(inputType)) {

    //     //Checkboxes; radio buttons; select boxes etc
    //       var anInputType = data[inputType];

    //       for (var filtertype in anInputType) {
    //         if (anInputType.hasOwnProperty(filtertype)) {
    //           var filterKeys = anInputType[filtertype];

    //           for (var aFilterKey in filterKeys) {
    //             var aFilterValue = filterKeys[aFilterKey];

    //             //Don't include de-selected values
    //             if(aFilterValue!=false && aFilterValue !=undefined) {
    //               var aFilter = {type: filtertype, value: aFilterKey};
    //               filteringService.saveAppliedFilter(aFilter);

    //             }else{
    //               var aFilter = {type: filtertype, value: aFilterValue};
    //               filteringService.removeFilter(aFilter);
    //             }
    //           }
    //         }
    //       }
    //   }
    // }

    // //Now we have some clearing up to do
    // filteringService.remove_unrequiredFilters();

    // return;
  }



  filteringService.populateQuickFilters = function(quickFilters){

    //// GO ids.
    //1. split into tokens
    //var goIdsTargets = quickFilters.text.goID.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]|\s+|,|;|\.|\|/);
    //var goIdsTargets = quickFilters.text.goID.split(/[^\w\d:]/);
    //console.log("[filteringService.js] Save quick filters for goIDs", goIdsTargets);

    filteringService.createFilterForGoTerm(quickFilters.text.goID);

    ////Gene ids
    //1. Split into tokens
    //var gpIdsTargets = quickFilters.text.gpID.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]|\s+|,|;|\.|\|/);
    filteringService.createFilterForOther('gpID', quickFilters.text.gpID);
  }


  // Create GO Term filters from a list of tokens
  filteringService.createFilterForGoTerm = function(value) {
    var tokens = value.split(/[^\w\d:]/);

    for(var j=0; j<tokens.length; j++) {

      //Make as restrictive as possible
      var niceContent = tokens[j].match(/^GO:\d{7}$/);

      if (niceContent != null) {

        console.log("[filteringService.js] candidate for goid", niceContent[0]);

        var aFilter = {type: 'goID', value: niceContent[0]};
        filteringService.saveAppliedFilter(aFilter);
      }
    }
  }


  // Create  filters from a list of tokens
  filteringService.createFilterForEvidences = function(value) {

    var tokens = value.split(/[^\w\d:]/);

    for(var j=0; j<tokens.length; j++) {

      //Make as restrictive as possible
      var niceContent = tokens[j].match(/^ECO:\d{7}$/);

      if (niceContent != null) {

        console.log("[filteringService.js] candidate for ecoID", niceContent[0]);

        var aFilter = {type: 'ecoID', value: niceContent[0]};
        filteringService.saveAppliedFilter(aFilter);
      }
    }
  }

  // Create Reference filters from a list of tokens
  filteringService.createFilterForReferences = function(value) {

    //var tokens = values.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]|\s+|,|;|\.|\|/);
    var tokens = value.split(/[^\w\d:\*]/);

    console.log("[filteringService.js] Filter for references", tokens);

    for(var j=0; j<tokens.length; j++) {

      //Make a checkable value
      var upperCase = tokens[j].toUpperCase();

      //Check obvious values - User will need
      if(upperCase=='DOI*' || upperCase=='GO_REF*' || upperCase=='PMID*' || upperCase=='Reactome*'){
        var aFilter = {type: 'reference', value: upperCase};
        filteringService.saveAppliedFilter(aFilter);
        continue;
      }

      //Otherwise we should have a GO:REF
      var niceContent = upperCase.match(/^GO_REF:\d{7}$/);

      if (niceContent != null) {

        console.log("[filteringService.js] candidate for reference", niceContent[0]);

        var aFilter = {type: 'reference', value: niceContent[0]};
        filteringService.saveAppliedFilter(aFilter);
      }
    }
  }


  // Create Taxon filters from a list of tokens
  filteringService.createFilterForTaxons = function(value){

    var tokens = value.split(/[^\w\d:]/);   //Even tho' will be only numbers, don't split on letters

    for(var j=0; j<tokens.length; j++) {
      var niceContent = tokens[j].match(/^[0-9]+$/);

      if (niceContent != null) {

        console.log("[filteringService.js] candidate for taxon", niceContent[0]);

        var aFilter = {type: 'taxon', value: niceContent[0]};
        filteringService.saveAppliedFilter(aFilter);
      }
    }
  }


  // Create Other filters from a list of tokens, supplying the filter type key
  filteringService.createFilterForOther = function(filterType, value){

    var tokens = value.split(/[^\w\d:]/);

    for(var j=0; j<tokens.length; j++) {
      var niceContent = tokens[j].match(/[A-Za-z0-9]+/);

      if (niceContent != null) {

        console.log("[filteringService.js] candidate for other Filter type", niceContent[0]);

        var aFilter = {type: filterType, value: niceContent[0]};
        filteringService.saveAppliedFilter(aFilter);
      }
    }
  }



  filteringService.remove_unrequiredFilters = function(){

    var foundGoRelationIsExact=false;
    var foundGoId=false;
    var foundEcoId=false;

    //Remove goTermUse and goRelations if
    var i;
    for (i = 0; i < filters.length; i++) {

      if(filters[i].type=='goID'){
        foundGoId = true;
      }

      if(filters[i].type=='goTermUse' && filters[i].value=='exact'){
        foundGoRelationIsExact = true;
      }

      if(filters[i].type=='ecoID'){
        foundEcoId = true;
      }

    }

    //Remove the default values for go terms if a value for go id has not been entered.
    if(!foundGoId){
      filters = filteringService.remove_item(filters, 'goTermUse');
      filters = filteringService.remove_item(filters, 'goRelations');
    }

    if(foundGoRelationIsExact){
      filters = filteringService.remove_item(filters, 'goRelations');
    }

    if(!foundEcoId){
      filters = filteringService.remove_item(filters, 'ecoTermUse');
    }

    return;

  }




  filteringService.remove_item = function (arr, value) {
    var b = '';
    for (b in arr) {
      if (arr[b].type === value) {
        arr.splice(b, 1);
        break;
      }
    }
    return arr;
  }



  /**
   * Parse the content of the applied filters model supplied form the advanced filters modal and form.
   * //todo get rid of the quotes required around individual values. These have to be in there to make stuff work
   */
  filteringService.simpleAppliedFilters = function(data, isSlim){
    //var appliedFilters = [];

    //console.log("state for isSlim is ", isSlim);
    isSlimRequest = isSlim;
    //console.log("state for isSlimRequest is ", isSlimRequest);

    //console.log("simpleAppliedFilters", data);

    var j=-1;
    for(j=0; j<data.length; j++) {

      //var aFilter = {type: property, value: res[i]};
      filteringService.saveAppliedFilter(data[j]);
    }
    return;
  };



  /**
   * Parse the content of the advanced filters supplied from the slimming page
   * //todo get rid of the quotes required around individual values. These have to be in there to make stuff work
   */
  filteringService.returnListOfFilters = function(data){
    //console.log("returnListOfFilters ", data);
    var filterTerms = [];

    for(var inputType in data) {

      if (data.hasOwnProperty(inputType)) {
        //console.log("Input type", inputType);

        //Don't process the following
        //Input fields; text area etc
        if (inputType == 'ignore') {
          continue;
        }

        //Input fields; text area etc
        if (inputType == 'text') {

          var anInputType = data[inputType];
          //console.log("An Input type", anInputType);

          //parse content
          for (var property in anInputType) {

            if (anInputType.hasOwnProperty(property)) {

              //console.log("Has own proerty", property);
              var values = anInputType[property];
              var res = values.split("\n");
              //console.log("res",res);
              var i;
              for (i = 0; i < res.length; i++) {

                var aFilter = {type: property, value: res[i]};
                filterTerms.push(aFilter);
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
          //console.log("An Input type", anInputType);

          for (var filtertype in anInputType) {
            if (anInputType.hasOwnProperty(filtertype)) {
              //console.log("Has own property", filtertype);

              var filterKeys = anInputType[filtertype];

              //console.log("filterKeys", filterKeys);

              for (var aFilterKey in filterKeys) {

                var aFilterValue = filterKeys[aFilterKey];

                //Don't include de-selected values
                if(aFilterValue!=false) {

                  //console.log("aFilterValue", aFilterValue);

                  var aFilter = {type: filtertype, value: aFilterValue};
                  filterTerms.push(aFilter);
                  //$scope.appliedFilters.push({type: filtertype, value: aFilterValue});
                //}else{
                //  //console.log("Removing filter ", aFilter);
                //  var aFilter = {type: filtertype, value: aFilterValue};
                //  filteringService.removeFilter(aFilter);
                }
              }
            }
          }
        }

        //Have to deal with drop down selects like this atm.
        if(inputType == 'predefinedSlimSet'){

          var anInputType = data[inputType];
          //console.log("An Input type", anInputType);

          var value = anInputType['subset'];
          //console.log("A value", value);

          var aFilter = {type: 'goSlim', value: value};
          filterTerms.push(aFilter);
          //$scope.appliedFilters.push({type: 'subSet', value: value});
        }
      }
    }
    return filterTerms;
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
   * Turn the filters into a json object that can be posted back to the server
   */
  filteringService.filterObject =  function (){

    //return {list:filters};
    return filters;

    }


  /**
   * Create the appropriate selection string for the slim request
   * @returns {string}
   */
  filteringService.createSlimString =  function (){

    return isSlimRequest?"&slim=true":"&slim=false";
  }


  /**
   * Save whether the last filtering request was a slim or not
   * @returns {string}
   */
  filteringService.isSlimming =  function (){

    return isSlimRequest;
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

    //Now we have some clearing up to do
    filteringService.remove_unrequiredFilters();

  };

  /**
   * Clear all filters
   */
  filteringService.clearFilters=function(){
    //console.log("Clearing filters");
    filters = [];
  };


  /**
   * Check if filter exists
   */

  filteringService.hasFilter=function(aFilter){

    var j=-1;
    var exists=0;
    for(j=0; j<filters.length; j++){

      if(filters[j]=='undefined'){
        continue;
      }

      //console.log("what is j",j);

      if(filters[j].type == aFilter.type & filters[j].value == aFilter.value){
        exists=1;
      }
    }

    return exists;

  }



  /**
   * Save the object to applied filters if it doesn't exist already
   */
  filteringService.saveValuesAsFilter=function(filtertype, aFilterValue) {

    var aFilter = {type: filtertype, value: aFilterValue};
    this.saveAppliedFilter(aFilter);
  }


  /**
   * Save the object to applied filters if it doesn't exist already
   */
  filteringService.saveAppliedFilter=function(aFilter){
    //console.log('Content of applied Filters is', filters);
    //console.log("save applied filter ", aFilter);


    var j=-1;
    var exists=0;
    for(j=0; j<filters.length; j++){

      if(filters[j]=='undefined'){
        continue;
      }

      //console.log("what is j",j);

      if(filters[j].type == aFilter.type & filters[j].value == aFilter.value){
        exists=1;
      }
    }


    if(!exists) {
      filters.push(aFilter);
    }

    //console.log('Content of applied Filters is now', filters);

  }





  return filteringService;
});
