/**
 * Created by twardell on 17/12/2014.
 */

var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);


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

wsService.factory('taxonConstraints', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
    return $resource(targetDomainAndPort+'/ws/dataset/taxonConstraints', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
}]);

wsService.factory('annotationBlacklist', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/dataset/annotationBlacklist', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('annotationPostProcessing', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/dataset/annotationPostProcessing', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('evidencetypes', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/evidencetypes', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('withDBs', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/withdbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('assignDBs', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/assigneddbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('ontologies', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort) {
  return $resource(targetDomainAndPort + '/ws/terms/:ontology', {ontology: '@ontology'}, {
    query: {method: 'GET', Cache: true}
  });
}]);

wsService.factory('search', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/search', {query: '@query', format:'JSON'}, {
    query: {method:'GET'}
  });
}]);

wsService.factory('searchfull', ['$resource', 'targetDomainAndPort', function($resource, targetDomainAndPort){
  return $resource(targetDomainAndPort+'/ws/searchfull', {text: '@text',format:'JSON', page:'@page', row:'@rows', viewBy:'@viewBy'}, {
    query: {method:'GET'}
  });
}]);
