var errorHandling = angular.module('quickGoFeApp.errorHandling', []);

errorHandling.factory('httpErrorResponseInterceptor', ['$q', '$location',
  function($q, $location) {
    return {
      response: function(responseData) {
        return responseData;
      },
      responseError: function error(response) {
        switch (response.status) {
          case 404:
            $location.path('/404');
            break;
          default:
            $location.path('/error');
        }

        return $q.reject(response);
      }
    };
  }
]);
