app.controller('goTermsFilter', function($scope, basketService, stringService,
  validationService, termService){

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
    termService.getGOTerms(goterms)
      .success(function(d){
        angular.forEach(d.results, function(goTerm){
          goTerm.checked = true;
          $scope.goIDs.unshift(goTerm);
        });
      })
      .error(function(e){
        //TODO handle messaging
        console.log(e);
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
