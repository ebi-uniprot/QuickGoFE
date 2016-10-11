app.controller('productTypeFilter', function($scope){

  $scope.gpTypes = {
    'protein': {
      'id': 'protein',
      'label': 'Protein',
      'checked': false
    },
    'rna': {
      'id': 'rna',
      'label': 'RNA',
      'checked': false
    },
    'complex': {
      'id': 'complex',
      'label': 'Complex',
      'checked': false
    },
  };

  var init = function() {
    if($scope.$parent.query.geneProductType) {
      angular.forEach($scope.$parent.query.geneProductType.split(','), function(type) {
        $scope.gpTypes[type].checked = true;
      })
    }
  }

  $scope.reset = function() {
    $scope.$parent.query.geneProductType = '';
    $scope.$parent.updateQuery();
  }

  $scope.apply = function() {
    $scope.$parent.addToQuery('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
  }

  init();
});
