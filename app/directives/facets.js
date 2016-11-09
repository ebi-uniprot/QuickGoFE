angular
  .module('quickGoFeApp')
  .directive('facets', ['$http','$location', function() {
    return {
      restrict: 'E',
      scope: {
        searchTerm: '=',
        endpoint: '@',
        fields: '=',
        filters: '='
      },
      templateUrl: 'directives/facets.html',
      link: function($scope) {

        $scope.getFilterUrl = function(field, category) {
          return (($scope.filters && $scope.filters.length > 0) ? $scope.filters + '&' : '') + field + '=' + category;
        };

        $scope.isSelected = function(field, category) {
          return $scope.filters.indexOf(field + '=' + category) > -1;
        };

        $scope.removeFilterUrl = function(field) {
          var filters = _.filter($scope.filters.split('&'), function(filter){
              return !filter.startsWith(field);
          });
          return filters.join();
        }

      }
    };
  }]);
