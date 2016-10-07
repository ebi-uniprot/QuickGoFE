app.controller('goTermsFilter', function($scope, basketService, stringService,
  validationService, termService, presetsService){

  $scope.goIDs = [];
  $scope.goTermUse = 'ancestor';
  $scope.goRelations = 'IPO';

  
  var init = function() {
    angular.forEach($scope.$parent.query.goId, function(goId){
      $scope.goIDs.push({
        'id':goId,
        'checked':true
      })
    });

    //Basket items
    basketService.getItems().then(function(d){
      var data = d.data.results;
      angular.forEach(data, function(goTerm){
        if(!_.contains(_.pluck($scope.goIDs,'id'),goTerm.id)) {
          goTerm.checked = false;
          $scope.goIDs.push(goTerm);
        }
      });
    });
        
    // Get predefined slim sets
     presetsService.getPresets().then(function(resp){
       $scope.predefinedSlimSets = resp.data.goSlimSets;
     });
    
  };

  $scope.reset = function() {
    $scope.$parent.query.goId = '';
    $scope.goTermUse = 'ancestor';
    $scope.goRelations = 'IPO';
    $scope.$parent.updateQuery();
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
  
  $scope.apply = function() {
    $scope.$parent.addToQuery('goId', _.pluck(_.filter($scope.goIDs, 'checked'), 'id'));
  };

  $scope.addPredefinedSet = function() {
    angular.forEach($scope.selectedPreDefinedSlimSet.associations, function(goTerm) {
      $scope.goIDs.unshift({
        'id': goTerm,
        'checked': true
      })
    });
  };

  init();

});
