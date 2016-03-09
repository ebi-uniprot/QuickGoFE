var errorHandling = angular.module('quickGoFeApp.errorHandling', []);
var lowImpactErrors = ['statsPostNewNamesNotSpring', 'costats'];

errorHandling.factory('httpErrorResponseInterceptor', ['$q', '$location', '$rootScope',
  function($q, $location, $rootScope) {
    return {
      response: function(responseData) {
        return responseData;
      },
      responseError: function error(response) {
        if (_.some(lowImpactErrors, function(item) {
            return response.config.url.split(item).length > 0;
          })) {
          $rootScope.globalErrorMessage = 'Statistics could not be loaded.';
        } else {
          switch (response.status) {
            case 404:
              $location.path('/404');
              break;
            default:
              $location.path('/404');
          }
        }
        return $q.reject(response);
      }
    };
  }
]);
