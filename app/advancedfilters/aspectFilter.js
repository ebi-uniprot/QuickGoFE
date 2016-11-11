app.controller('aspectFilter', function($scope){

  $scope.aspects = {
    'molecular_function':{
      'id': 'molecular_function',
      'label' : 'Molecular function',
      'checked' : false
    },
    'biological_process':{
      'id': 'biological_process',
      'label' : 'Biological process',
      'checked' : false
    },
    'cellular_component':{
      'id': 'cellular_component',
      'label' : 'Cellular Component',
      'checked' : false
    }
  };


  var init = function() {
    if($scope.$parent.query.aspect) {
      angular.forEach($scope.$parent.query.aspect.split(','), function(aspect) {
        $scope.aspects[aspect].checked = true;
      })
    }
  };

  $scope.reset = function() {
    $scope.$parent.query.aspect = '';
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('aspect', _.pluck(_.filter($scope.aspects, 'checked'), 'id'));
  };

  init();
});
