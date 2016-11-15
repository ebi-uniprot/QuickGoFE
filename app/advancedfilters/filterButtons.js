app.directive('filterButtons', function() {
  return {
    restrict: 'E',
    template: '<button class="button" type="button" ng-click="reset()">Reset</button>      <button class="button" type="button" ng-click="apply()">Apply</button>',
    link: function($scope, element, attrs) {
    }
  }
})
