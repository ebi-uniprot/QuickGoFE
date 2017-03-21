'use strict';
angular
  .module('quickGoFeApp')
  .directive('autocomplete', function() {
    return {
      restrict: 'E',
      scope: {
        model: '=',
        data: '='
      },
      templateUrl: 'directives/autocomplete.html',
      link: function(scope, element, attrs) {

        scope.placeholder = attrs.placeholder;
        scope.items = {};

        var reset = function() {
          scope.searchTerm = '';
          scope.items = {};
        };

        scope.provideSuggestions = function(keyCode) {
          if (keyCode === 27) {
            reset();
          }

          if (scope.searchTerm && scope.data && scope.data.length > 0) {
            angular.extend(scope.items, _.filter(scope.data, function(d) {
              return d.name.includes(scope.searchTerm);
            }));
          }
        };

        scope.selectItem = function(id, $event) {
          $event.stopPropagation();
          scope.model = scope.searchTerm = id;
          scope.items = {};
        };

        scope.$watch('model', function(value){
          if(value === ''){
            scope.searchTerm = '';
          }
        });

      }
    };
  });
