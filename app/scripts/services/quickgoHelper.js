/**
 * Created by twardell on 30/09/2015.
 */
var servicesModule = angular.module('quickGoFeApp.ServicesModule', []);

servicesModule.factory('quickGOHelperService', function() {


  var quickGOHelperService = {};

  quickGOHelperService.toAspectCode = function (aspectName){
    if(aspectName == "Cellular Component"){
     return 'C';
    }
    if(aspectName == "Molecular Function"){
      return 'F';
    }
    if(aspectName == "Biological Process"){
      return 'P';
    }
    console.log('Unknown Aspect Description', aspectName);
    return '?';
  };

  return quickGOHelperService;
});
