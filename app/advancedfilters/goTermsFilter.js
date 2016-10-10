app.controller('goTermsFilter', function($scope, basketService, stringService,
  validationService, termService, presetsService){

  $scope.goTerms = {};
  $scope.goTermUse = 'descendants';
  $scope.goRelations = 'is_a,part_of,occurs_in';

  
  var init = function() {
    var termsToFetch = [];
    var checkedTerms = [];
    if($scope.$parent.query.goId) {
      checkedTerms = termsToFetch.concat($scope.$parent.query.goId.split(','));
    } 
    
    if (basketService.getIds().length > 0){
      termsToFetch = termsToFetch.concat(basketService.getIds());      
    }
    
    termsToFetch.concat(checkedTerms);    
    termsToFetch = _.uniq(termsToFetch);

    if(termsToFetch.length > 0){
      termService.getGOTerms(termsToFetch.toString()).then(function(d){
        var data = d.data.results;
        angular.forEach(data, function(goTerm){
          goTerm.checked = _.contains(checkedTerms,goTerm.id);
          $scope.goTerms[goTerm.id] = goTerm;
        });
      });
    }

    // Get predefined slim sets
     presetsService.getPresets().then(function(resp){
       $scope.predefinedSlimSets = resp.data.goSlimSets;
     });
    
  };

  $scope.reset = function() {
    $scope.$parent.query.goId = '';
    $scope.$parent.query.usage = '';
    $scope.$parent.query.usageRelationships = '';
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
          $scope.goTerms[goTerm.id] = goTerm;
        });
      })
      .error(function(e){
        //TODO handle messaging
        console.log(e);
      });
    $scope.goTermsTextArea = '';
  };
  
  $scope.apply = function() {
    var selected = _.filter(_.keys($scope.goTerms), function(term){
      return $scope.goTerms[term].checked;
    });
    $scope.$parent.addToQuery('goId', selected);
    $scope.$parent.addToQuery('usage', $scope.goTermUse);
    $scope.$parent.addToQuery('usageRelationships', $scope.goRelations);
  };

  $scope.addPredefinedSet = function() {
    if($scope.selectedPreDefinedSlimSet) {
      termService.getGOTerms($scope.selectedPreDefinedSlimSet.associations).then(function(d){
        var data = d.data.results;
        angular.forEach(data, function(goTerm){
          goTerm.checked = true;
          $scope.goTerms[goTerm.id] = goTerm;
        });
      });
    }
  };

  init();

});
