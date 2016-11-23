app.controller('referencesFilter', function($scope, presetsService, stringService){

  $scope.references = {};

  var initReference = function() {
    presetsService.getPresetsReferences().then(function(resp){
      var checked = [];
      if($scope.$parent.query.reference) {
        checked = checked.concat($scope.$parent.query.reference.split(','))
      }
      angular.forEach(resp.data.references, function(ref){
        ref.checked = _.contains(checked, ref.name);
        $scope.references[ref.name] = ref;
      });
    });
  };

  $scope.addReferences = function() {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea);
    angular.forEach(refs, function(refID){
      $scope.references[refID] = {
        'name':refID,
        checked: true
      };
    });
    $scope.referenceTextArea = '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('reference', getQuery());
  };

  $scope.reset = function () {
    $scope.$parent.query.reference = '';
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'name');
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  initReference();
});
