/**
 * Created by twardell on 04/03/2015
 * This controller handles the creation and initial processing of the advanced filters modal.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $modalInstance, $modal, $location, basketService, evidencetypes, withDBs,
                                               assignDBs, filteringService, hardCodedDataService, PreDefinedSlimSets) {


  $scope.advancedFilters = {};
  $scope.useSlim = 0;


  //Define objects to take values
  $scope.advancedFilters = {};
  $scope.advancedFilters.boolean = {};

  $scope.advancedFilters.boolean.reference = {};
  $scope.advancedFilters.boolean.with= {};
  $scope.advancedFilters.boolean.taxon= {};
  $scope.advancedFilters.boolean.assignedby= {};
  $scope.advancedFilters.boolean.gpSet= {};
  $scope.advancedFilters.boolean.qualifier= {};
  $scope.advancedFilters.boolean.goID= {};
  $scope.advancedFilters.boolean.aspect= {};
  $scope.advancedFilters.boolean.ecoID= {};
  $scope.advancedFilters.boolean.ecoTermUse= {};

  $scope.advancedFilters.text = {};
  $scope.advancedFilters.text.taxon = "";
  $scope.advancedFilters.text.gpID = "";
  $scope.advancedFilters.text.goID = "";
  $scope.advancedFilters.text.goTermUse="ancestor";
  $scope.advancedFilters.text.goRelations="IPO";
  $scope.advancedFilters.text.ecoID="";

  //Setup the fixed eco codes
  $scope.ecocode0000352='ECO:0000352'
  $scope.ecocode0000269='ECO:0000269';

  $scope.advancedFilters.text.ecoTermUse="ancestor";

  //To show or not show the all NOT button for qualifiers
  $scope.showAllNotQualifiers = 0;


  /**
   * ---------------------------------------   Data loading Operations    --------------------------------------------
   */

  //Basket items are used by the go identifer tab
  $scope.basketItems = basketService.getItems();
  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
  $scope.referenceList = hardCodedDataService.getFilterReferences();
  $scope.qualifiers = hardCodedDataService.getQualifiers();



  /**
   * Get predefined slim sets
   */
  //$scope.predefinedSlimSets = PreDefinedSlimSets.query();
  var resultPSS = PreDefinedSlimSets.query();
  resultPSS.$promise.then(function(data){
    $scope.predefinedSlimSets = data;
    console.log("PredefinedSlimSets", $scope.predefinedSlimSets);
  });

  /**
   * Get Evidence Types
   */
  var resultET = evidencetypes.query();
  resultET.$promise.then(function(data){
    $scope.evidenceTypes = data;
    console.log("Got Evidence Types", $scope.evidenceTypes);

    //Load filters containing evidenceTypes only after evidence types have been loaded.
    //todo replace this with loading the evidenceTypes only once
    var i;
    for (i = 0; i < filters.length; i++) {

      //Evidence
      if (filters[i].type == 'ecoID') {

        if(filters[i].value=='ECO:0000352'){
          $scope.advancedFilters.boolean.ecoID[$scope.ecocode0000352] = filters[i].value;
        }

        if(filters[i].value=='ECO:0000269'){
          $scope.advancedFilters.boolean.ecoID[$scope.ecocode0000269] = filters[i].value;
        }


        //requested taxon in hardcoded list, then populate boolean otherwise populate text
        var ecoCounter;
        var commonEco = false;
        for (ecoCounter = 0; ecoCounter < $scope.evidenceTypes.length; ecoCounter++) {

          console.log("Iterating evidence types, found", $scope.evidenceTypes[ecoCounter].ecoTerm);

          if ($scope.evidenceTypes[ecoCounter].ecoTerm == filters[i].value) {
            console.log("Loading evidence with", filters[i].value);
            $scope.advancedFilters.boolean.ecoID[filters[i].value] = filters[i].value;
            commonEco = true;
          }
        }

        if (!commonEco && filters[i].value!='ECO:0000352' && filters[i].value!='ECO:0000269') {
          $scope.advancedFilters.text.ecoID += filters[i].value + '\n';
        }
        continue;
      }

    }



  });

  /**
   * Get With DBs
   */
  var resultWDB = withDBs.query();
  resultWDB.$promise.then(function(data){
    $scope.withDBs = data;
    $scope.withDBs.sort(function comparewithDBs(a,b) {
      if (a.dbId < b.dbId)
        return -1;
      if (a.dbId > b.dbId)
        return 1;
      return 0;
    });
    //console.log("Got With DBs", $scope.withDBs);
  });



  /**
   * Get Assigned DBs
   */
  var resultADB = assignDBs.query();
  resultADB.$promise.then(function(data){
    $scope.assignDBs = data;
    $scope.assignDBs.sort(function comparewithDBs(a,b) {
      if (a.dbId < b.dbId)
        return -1;
      if (a.dbId > b.dbId)
        return 1;
      return 0;
    });
    //console.log("Got Assigned DBs", $scope.assignDBs);
  });



  /**
   * --------------------------------    Load already selected filters to the advanced filter models --------------------
   */


  var filters = filteringService.getFilters();
  console.log("Loading filters to front end", filters);

 var i;
  for (i = 0; i < filters.length; i++) {
  console.log("going through filters", filters[i]);


    //Gene Product ID
    if(filters[i].type == 'gpID'){
      $scope.advancedFilters.text.gpID+=filters[i].value;
        continue;
    }


    //Qualifier
    if(filters[i].type == 'qualifier'){
      $scope.advancedFilters.boolean.qualifier[filters[i].value] = filters[i].value;
      continue;
    }


    //GO Identifier
    if(filters[i].type == 'goID'){

      //Is the goID in the basket? if so show its selected.
      var basketCounter;
      for(basketCounter=0; basketCounter<$scope.basketItems.length; basketCounter++){
        if($scope.basketItems[basketCounter].termId == filters[i].value ){
          $scope.advancedFilters.boolean.goID[$scope.basketItems[basketCounter].termId]=filters[i].value;
          continue;
        }
      }

      //If the goTerm is not in the basket, then it must be in the text box
      $scope.advancedFilters.text.goID+=filters[i].value + '\n';
      continue;
    }

    //Go Term Use - goTermUse
    if(filters[i].type == 'goTermUse'){
      $scope.advancedFilters.text.goTermUse=filters[i].value;
      console.log("set value of goTermUse to ", $scope.advancedFilters.text.goTermUse);
      continue;
    }

    //Go Relations - goRelations
    if(filters[i].type == 'goRelations'){
      $scope.advancedFilters.text.goRelations=filters[i].value;
      continue;
    }

    //Aspect
    if(filters[i].type == 'aspect'){
      $scope.advancedFilters.boolean.aspect[filters[i].value] = filters[i].value;
      continue;
    }

    ////Evidence
    //if(filters[i].type == 'ecoID'){
    //
    //  //requested taxon in hardcoded list, then populate boolean otherwise populate text
    //  var ecoCounter;
    //  var commonEco=false;
    //  for (ecoCounter = 0; ecoCounter <  $scope.evidenceTypes.length; ecoCounter++){
    //    if( $scope.evidenceTypes[ecoCounter].ecoTerm == filters[i].value){
    //      $scope.advancedFilters.boolean.ecoID[filters[i].value] = filters[i].value;
    //      commonEco=true;
    //    }
    //  }
    //
    //  if(!commonEco){
    //    $scope.advancedFilters.text.ecoID+=filters[i].value + '\n';
    //  }
    //  continue;
    //}


    //Reference
    if(filters[i].type == 'reference'){
      $scope.advancedFilters.boolean.reference[filters[i].value] = filters[i].value;
      continue;
    }

    if(filters[i].type == 'with'){
      $scope.advancedFilters.boolean.with[filters[i].value] = filters[i].value
      continue;
    }

    if(filters[i].type == 'taxon'){

      //requested taxon in hardcoded list, then populate boolean otherwise populate text
      var taxCounter;
      var commonTax=false;
      for (taxCounter = 0; taxCounter < $scope.mostCommonTaxonomies.length; taxCounter++){
        if($scope.mostCommonTaxonomies[taxCounter].taxId == filters[i].value){
          $scope.advancedFilters.boolean.taxon[filters[i].value] = filters[i].value;
          commonTax=true;
        }
      }

      if(!commonTax){
        $scope.advancedFilters.text.taxon+=filters[i].value + '\n';
      }
      continue;
    }

    if(filters[i].type == 'assignedby'){
      $scope.advancedFilters.boolean.assignedby[filters[i].value] = filters[i].value;
      continue;
    }

  }



  /**
   * ---------------------------------------   Button related functions   --------------------------------------------
   */

  $scope.cancel  = function(){
    $modalInstance.dismiss('cancel');

  }

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.submit = function(){

    console.log("Submitted advancedFilters",$scope.advancedFilters);
    console.log("Submitted useSlim",$scope.useSlim);

    //If a goid has not been selected then remove the defaults for ancestor and relationship from the submitted filters
    //console.log("Clear the defaults for radio buttons in the advanced filters dialogue. ", $scope.advancedFilters);
    //
    //hasGoId=0;
    //
    //for(var input in $scope.advancedFilters.boolean) {
    //
    //  if ($scope.advancedFilters.boolean.hasOwnProperty(input)) {
    //    if (input == 'goID') {
    //      hasGoId = 1;
    //    }
    //  }
    //}
    //
    //for(var input in $scope.advancedFilters.text) {
    //
    //  if ($scope.advancedFilters.text.hasOwnProperty(input)) {
    //    if (input == 'goID' || input=='predefinedSlimSet') {
    //      hasGoId = 1;
    //    }
    //  }
    //}
    //
    //if(hasGoId==0){
    //  delete $scope.advancedFilters.text.goTermUse;
    //  delete $scope.advancedFilters.text.goRelations;
    //}


    //Clear existing filters
    filteringService.clearFilters();

    filteringService.populateAppliedFilters( $scope.advancedFilters,  $scope.useSlim);

    //Tell annotations list this value has been updated.

    $scope.$emit('filtersUpdate', $scope.advancedFilters);   //todo change this so is notification only

    //Now go back to the annotation list
    $modalInstance.dismiss('cancel');
    $location.path("annotations");
  }




  $scope.selectAllNotQualifiers = function () {

    for (qualifierCounter = 0; qualifierCounter < $scope.qualifiers.length; qualifierCounter++) {
      console.log($scope.qualifiers[qualifierCounter]);

      if ($scope.qualifiers[qualifierCounter].name.indexOf('NOT') != -1) {

        var targetQualifier = $scope.qualifiers[qualifierCounter].qualifier;
        console.log("setting qualifier", targetQualifier);
        $scope.advancedFilters.boolean.qualifier[targetQualifier] = targetQualifier;
      }
    }

    $scope.showAllNotQualifiers = 1;
  }

    $scope.deselectAllNotQualifiers = function () {

      for (qualifierCounter = 0; qualifierCounter < $scope.qualifiers.length; qualifierCounter++) {
        console.log($scope.qualifiers[qualifierCounter]);

        if ($scope.qualifiers[qualifierCounter].name.indexOf('NOT') != -1) {

          var targetQualifier = $scope.qualifiers[qualifierCounter].qualifier;
          console.log("unsetting qualifier", targetQualifier);
          $scope.advancedFilters.boolean.qualifier[targetQualifier] = '';
        }
      }

      $scope.showAllNotQualifiers=0;
  }

  /**
   * ------------------------------------ Evidence Code Graph Image --------------------------------------------------
   */


  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showEvidenceCodeOntologyGraph = function (ecoId) {

    var modalInstance = $modal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:ecoId, name:'', scope:'ECO'};
        }
      }
    });

  };

  /**
   * ------------------------------------ Filtering Operations for Go Ids ----------------------------------------------
   */

  //If any go term use other than exact is chosen, set the go relations (if not already set) to the default of IPO
  $scope.ensureGoRelations = function(){
    if($scope.advancedFilters.text.goRelations == undefined || $scope.advancedFilters.text.goRelations==null){
      $scope.advancedFilters.text.goRelations = 'IPO';
    }
  }


  // If a go term use of exact has been selected, then we should not set the value for go relations
  $scope.removeGoRelations = function(){
    console.log("Removing go relations");
    delete $scope.advancedFilters.text.goRelations;
  }

  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

});

