'use strict';
angular
  .module('quickGoFeApp')
  .directive('statsTable', [ function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/statsTable.html',
      scope: {
        'title': '@',
        'items' : '=',
        'isTerm' : '@?'
      }, link: function(scope) {
        scope.isTerm = scope.isTerm ? scope.isTerm : false;
        scope.formatNumber = function(number) {
          return number.toLocaleString();
        };
      }
    };
}]);
