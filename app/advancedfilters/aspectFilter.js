app.controller('aspectFilter', function($scope, presetsService){
  $scope.aspects = {};

  var init = function() {
    var checked = [];
    if($scope.$parent.query.aspect) {
      checked = checked.concat($scope.$parent.query.aspect.split(','))
    }

    presetsService.getPresetsAspects().then(function(resp){
      var allAspects = _.sortBy(resp.data.aspects, 'name');
      angular.forEach(allAspects, function(aspect){
        aspect.checked = _.contains(checked, aspect.id);
        $scope.aspects[aspect.id] = aspect;
      });
    });
  };

  $scope.reset = function() {
    $scope.$parent.query.aspect = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('aspect', _.pluck(_.filter($scope.aspects, 'checked'), 'id'));
  };

  init();
});
