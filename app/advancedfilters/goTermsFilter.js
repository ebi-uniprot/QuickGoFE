app.controller('goTermsFilter', function($scope, basketService, stringService,
  validationService){

  var init = function() {
    $scope.goIDs = [];
    $scope.goTermUse = 'ancestor';
    $scope.goRelations = 'IPO';
    //Basket items
    basketService.getItems().then(function(d){
      var data = d.data.results;
      angular.forEach(data, function(goTerm){
        goTerm.checked = false;
        $scope.goIDs.push(goTerm);
      });
    });
  };

  $scope.resetGoTerms = function() {
    init();
  };

  $scope.addGoTerms = function() {
    var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
    angular.forEach(goterms, function(goTerm){
      if(validationService.validateGOTerm(goTerm)){
        var term = {
          id: goTerm,
          checked: true
        }
        $scope.goIDs.unshift(term);
      }
    });
    $scope.goTermsTextArea = '';
  };

  // Get predefined slim sets
  // var resultPSS = PreDefinedSlimSets.query();
  // resultPSS.$promise.then(function(data){
  //   $scope.predefinedSlimSets = data;
  // });


  $scope.updatePredefinedSets = function() {
    $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({
      setId: $scope.selectedPreDefinedSlimSet.subset
    });
    // $scope.availablePredefinedTerms.$promise.then(function(data) {
    //   angular.forEach(data, function(d) {
    //     $scope.filters.goID[d.termId] = true;
    //   })
    // });
  };

  init();

});
