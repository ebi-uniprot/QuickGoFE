'use strict';
app.directive('filterButtons', function() {
  return {
    restrict: 'E',
    template: '<button class="btn quickgo-btn" type="button" ng-click="reset()">Reset</button>      <button class="btn quickgo-btn" type="button" ng-click="apply()">Apply</button>',
    link: function(scope) {
      // scope.active = scope.active ? scope.active : false;
    }
  };
});
