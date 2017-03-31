'use strict';
app.directive('filterButtons', function() {
  return {
    restrict: 'E',
    template: '<button class="button" type="button" ng-click="reset()">Reset</button>      ' +
      '<button class="button" type="button" ng-click="apply()" ng-disabled="getTotalChecked() === 0">Apply</button>'
  };
});
