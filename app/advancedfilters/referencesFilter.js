'use strict';
app.controller('referencesFilter', function($scope, presetsService, stringService){

  $scope.references = {};

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'name');
  };

  var initReference = function() {
    //References
    if($scope.query.reference) {
      angular.forEach($scope.query.reference.split(','), function(id) {
        $scope.references[id] = {
          'name':id,
          'checked':true
        };
      });
    }
    presetsService.getPresets().then(function(resp){
      angular.forEach(resp.data.references, function(ref){
        ref.checked = _.contains(_.keys($scope.references), ref.name);
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

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  initReference();

});
