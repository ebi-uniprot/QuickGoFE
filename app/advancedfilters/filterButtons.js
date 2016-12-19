'use strict';
app.directive('filterButtons', function() {
  return {
    restrict: 'E',
    template: '<button class="button hollow" type="button" ng-click="reset()">Reset</button>      <button class="button hollow" type="button" ng-click="apply()">Apply</button>'
  };
});
