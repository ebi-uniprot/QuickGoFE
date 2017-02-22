'use strict';

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
            break;
          case 404:
            $location.path('/404');
            console.log('ERROR:', response);
            break;
          case 500:
            console.log(response);
            break;
          case -1 :
            break; //ols not found
          default:
            $location.path('/404');
            console.log('ERROR:', response);
        }
        if (response.data.messages) {
          $rootScope.alerts = _.map(response.data.messages, function(message){
            return {
              msg: message
            };
          });
        }
        return $q.reject(response);
      }
    };
  }
]);
