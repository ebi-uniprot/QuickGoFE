'use strict';
angular
  .module('quickGoFeApp')
  .directive('annotationsLink', ['searchService', '$rootScope', function(searchService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/annotationsLink.html',
      scope: {
        termId: '=?',
        productId: '=?'
      },
      link: function(scope) {
        if (scope.termId) {
          if (scope.termId.indexOf('GO') === 0) {
            scope.url = searchService.getAnnotationsForTermUrl(scope.termId);
          } else {
            scope.url = searchService.getAnnotationsForECOUrl(scope.termId);
          }
        } else if (scope.productId) {
          scope.url = searchService.getAnnotationsForProductUrl(scope.productId);
        }
        searchService.findAnnotationsForFilterUrl(scope.url).then(function(d) {
          scope.annotationsCount = d.data.numberOfHits;
        }, function(e){
          // obsolete terms
          scope.annotationsCount = -1;
        });
      }
    };
  }]);
