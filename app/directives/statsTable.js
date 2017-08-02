'use strict';
angular
  .module('quickGoFeApp')
  .directive('statsTable', [function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/statsTable.html',
      scope: {
        'title': '@',
        'items': '=',
        'mapping': '=',
        'isTerm' : '@?'
      }, link: function(scope) {
        scope.isTerm = scope.isTerm ? scope.isTerm : false;
      }
    };
}]);
