'use strict';
app.directive('filterButtons', function() {
  return {
    restrict: 'E',
    template: '<button class="btn quickgo-btn" type="button" ng-click="reset()">Reset</button>      <button class="btn quickgo-btn" type="button" disabled="{{}}" ng-click="apply()">Apply</button>'
  };
});
