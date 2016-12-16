app.controller('productTypeFilter', function($scope, presetsService){

  $scope.gpTypes = {};

  var init = function() {
    $scope.gpTypes = {};
    var checked = [];
    if($scope.query.geneProductType) {
      checked = checked.concat($scope.query.geneProductType.split(','))
    }

    presetsService.getPresetsGeneProductTypes().then(function(resp){
      var allTypes = _.sortBy(resp.data.geneProductTypes, 'name');
      angular.forEach(allTypes, function(type){
        type.checked = _.contains(checked, type.id);
        $scope.gpTypes[type.id] = type;
      });
    });
  };

  $scope.reset = function() {
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
  };

  init();
});
