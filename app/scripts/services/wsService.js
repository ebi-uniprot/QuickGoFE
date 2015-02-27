/**
 * Created by twardell on 17/12/2014.
 */

var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);

//services.factory('basket', function() {
//  var items = [];
//  var myBasketService = {};
//
//  myBasketService.addItem = function(item) {
//    items.push(item);
//  };
//  myBasketService.removeItem = function(item) {
//    var index = items.indexOf(item);
//    items.splice(index, 1);
//  };
//  myBasketService.items = function() {
//    return items;
//  };
//
//  return myBasketService;
//});


// http://wwwdev.ebi.ac.uk/QuickGO/ws/lookup?scope=go&id=GO:0006915

//services.factory('AnnotationListLoader', ['$resource',
//    function($resource) {
//        return $resource('http://wwwdev.ebi.ac.uk/QuickGO/ws/lookup/:id', {id: '@id'}, {
//                query: {method:'GET', params:{id:'go'}, isArray:true}
//            }
//        );
//    }]);

wsService.factory('PreDefinedSlimSets', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
    return $resource(targetDomainAndPort+'/ws/predefinedslims', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
  }]);

wsService.factory('PreDefinedSlimSetDetail', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/predefinedSetTerms/:setId', {setId: '@id'}, {
    query: {method:'GET', isArray:true}
  });
}]);

wsService.factory('term', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/term/:termId', {termId: '@id'}, {
    query: {method:'GET'}
  });
}]);

wsService.factory('annotationUpdates', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/dataset', {}, {
    query: {method:'GET', isArray:true, Cache:true}
  });
}]);

wsService.factory('goTermHistory', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/dataset/goTermHistory', {from:'@from', to:'@to', limit:'@limit'}, {
    query: {method:'GET', Cache:true}
  });
}]);
