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
            searchService.findAnnotationsForTerm(scope.termId).then(function(d) {
              scope.annotationsCount = d.data.numberOfHits;
            });
          } else {
            searchService.findAnnotationsForECO(scope.termId).then(function(d) {
              scope.annotationsCount = d.data.numberOfHits;
            });
          }
        } else if (scope.productId) {
          searchService.findAnnotationsForProduct(scope.productId).then(function(d) {
            scope.annotationsCount = d.data.numberOfHits;
          });
        }

        scope.getQuerytype = function() {
          if(scope.productId) {
            return 'geneProductId';
          } else if(scope.termId && scope.termId.indexOf('GO') === 0) {
            return 'goId';
          } else {
            return 'evidenceCode';
          }
        };

        scope.getId = function() {
          return scope.termId ? scope.termId : scope.productId;
        };

      }
    };
  }]);
