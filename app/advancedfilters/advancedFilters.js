/**
 * Created by twardell on 04/03/2015
 * This controller handles the creation and initial processing of the advanced filters modal.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $uibModalInstance, $uibModal, $location, basketService, evidencetypes, withDBs,
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
  //$scope.ecocode0000352='ECO:0000352'
  //$scope.ecocode0000269='ECO:0000269';
  $scope.evidencesArray = [];

  $scope.advancedFilters.text.ecoTermUse="ancestor";

  //To show or not show the all NOT button for qualifiers
  $scope.showAllNotQualifiers = 0;


  /**
   * ---------------------------------------   Data loading Operations    --------------------------------------------
   */

  //Basket items are used by the go identifer tab
  $scope.basketPromise = basketService.getItems();
  $scope.basketPromise.then(function(d){
    $scope.basketItems = d.data;
  })
  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
  $scope.referenceList = hardCodedDataService.getFilterReferences();
  $scope.qualifiers = hardCodedDataService.getQualifiers();
  $scope.geneProductSets =  hardCodedDataService.getGeneProductSets();



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

    var ecocode0000352 = {ecoTerm:'ECO:0000352', evidenceKey: 'IMP,IGI,IPI,IDA,IEP,EXP,ISS,TAS,NAS,ND,IC,RCA,IBA,IBD,IKR,IRD,ISA,ISM,ISO,IGC', evidence:'Manual Experimental'};
    $scope.evidencesArray.push(ecocode0000352);

    var ecocode0000269 = {ecoTerm:'ECO:0000269', evidenceKey: 'IDA,IMP,IPI,IGI,IEP,EXP', evidence:'Manual Experimental'};
    $scope.evidencesArray.push(ecocode0000269);

    for (i = 0; i < $scope.evidenceTypes.length; i++) {

      $scope.evidencesArray.push({ecoTerm:$scope.evidenceTypes[i].ecoTerm, evidenceKey: $scope.evidenceTypes[i].evidenceKey, evidence:$scope.evidenceTypes[i].evidence});

    }

    console.log("Got evidence types, found", $scope.evidencesArray);

    var i;

  //Set to true any evidence for which a filter has been created
    for (i = 0; i < filters.length; i++) {

      //Evidence
      if (filters[i].type == 'ecoID') {



        //requested taxon in hardcoded list, then populate boolean otherwise populate text
        var ecoCounter;
        var commonEco = false;
        for (ecoCounter = 0; ecoCounter < $scope.evidencesArray.length; ecoCounter++) {

          console.log("Iterating evidence types, found", $scope.evidencesArray[ecoCounter].ecoTerm);

          if ($scope.evidencesArray[ecoCounter].ecoTerm == filters[i].value) {
            console.log("Loading evidence with", filters[i].value);
            $scope.advancedFilters.boolean.ecoID[filters[i].value] = true;
            commonEco = true;
          }
        }

        //if (!commonEco && filters[i].value!='ECO:0000352' && filters[i].value!='ECO:0000269') {
        if (!commonEco) {
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
  //console.log("Loading filters to front end", filters);

 var i;
  for (i = 0; i < filters.length; i++) {
  //console.log("going through filters", filters[i]);


    //Gene Product ID
    if(filters[i].type == 'gpID'){
      $scope.advancedFilters.text.gpID+=filters[i].value + '\n';
        continue;
    }

    //Gene Product Set
    if(filters[i].type == 'gpSet'){
      $scope.advancedFilters.boolean.gpSet[filters[i].value]= true;
      continue;
    }


    //Qualifier
    if(filters[i].type == 'qualifier'){
      $scope.advancedFilters.boolean.qualifier[filters[i].value] = true;
      continue;
    }


    //GO Identifier
    if(filters[i].type == 'goID'){

      //Is the goID in the basket? if so show its selected.
      var basketCounter;
      var usedGoID = false;
      for(basketCounter=0; basketCounter<$scope.basketItems.length; basketCounter++){
        if($scope.basketItems[basketCounter].termId == filters[i].value ){
          $scope.advancedFilters.boolean.goID[$scope.basketItems[basketCounter].termId]=true;
          usedGoID = true;
          break;
        }
      }

      //If this filter value has been declared as a basket term then there is no need to continue.
      if(usedGoID){
        continue;
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

    //Evidence - this is dealt with during loading of evidences above


    //Reference
    if(filters[i].type == 'reference'){
      $scope.advancedFilters.boolean.reference[filters[i].value] = true;
      continue;
    }

    if(filters[i].type == 'with'){
      $scope.advancedFilters.boolean.with[filters[i].value] = true;
      continue;
    }

    console.log("[advancedFilters.js] Testing filters to see if it contains taxon");
    //advancedFilters.boolean.taxon[taxon.taxId]
    if(filters[i].type == 'taxon'){

      console.log("[advancedFilters.js] Taxon found.");

      //requested taxon in hardcoded list, then populate boolean otherwise populate text
      var taxCounter;
      var commonTax=false;
      for (taxCounter = 0; taxCounter < $scope.mostCommonTaxonomies.length; taxCounter++){
        if($scope.mostCommonTaxonomies[taxCounter].taxId == filters[i].value){
          $scope.advancedFilters.boolean.taxon[filters[i].value] = true;
          console.log("[advancedFilters.js] setting taxon on ", $scope.advancedFilters.boolean.taxon[filters[i].value]);
          commonTax=true;
        }
      }

      if(!commonTax){
        $scope.advancedFilters.text.taxon+=filters[i].value + '\n';
      }
      continue;
    }

    if(filters[i].type == 'assignedby'){
      $scope.advancedFilters.boolean.assignedby[filters[i].value] = true;
      continue;
    }

  }



  /**
   * ---------------------------------------   Button related functions   --------------------------------------------
   */

  $scope.cancel  = function(){
    $uibModalInstance.dismiss('cancel');

  }

  /**
   * Notify the filtering service with the submitted data
   */
  $scope.submit = function(){

    console.log("Submitted advancedFilters",$scope.advancedFilters);
    console.log("Submitted useSlim",$scope.useSlim);


    //Clear existing filters
    filteringService.clearFilters();

    filteringService.populateAppliedFilters( $scope.advancedFilters,  $scope.useSlim);

    //Tell annotations list this value has been updated.

    $scope.$emit('filtersUpdate', $scope.advancedFilters);   //todo change this so is notification only

    //Now go back to the annotation list
    $uibModalInstance.dismiss('cancel');
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

    var modalInstance = $uibModal.open({
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
    $uibModalInstance.dismiss('cancel');
  };

});

