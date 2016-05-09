var errorHandling = angular.module('quickGoFeApp.errorHandling', []);

errorHandling.factory('httpErrorResponseInterceptor', ['$q', '$location', '$rootScope',
  function($q, $location, $rootScope) {
    return {
      response: function(responseData) {
        return responseData;
      },
      responseError: function error(response) {
        switch (response.status) {
          case 400:
            if (response.data.message) {
              $rootScope.alerts.push({
                msg: response.data.message
              });
            } else {
              $rootScope.alerts.push({
                msg: 'Statistics could not be loaded.'
              });
            }
            break;
          case 404:
            $location.path('/404');
            console.log('ERROR:', response);
            break;
          case 500:
            console.log(response);
          default:
            $location.path('/404');
            console.log('ERROR:', response);
        }
        return $q.reject(response);
      }
    };
  }
]);
