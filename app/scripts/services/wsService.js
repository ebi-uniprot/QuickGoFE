/**
 * Created by twardell on 17/12/2014.
 */

var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);


wsService.factory('PreDefinedSlimSets', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/ws/predefinedslims', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
  }]);

wsService.factory('PreDefinedSlimSetDetail', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/predefinedSetTerms/:setId', {setId: '@id'}, {
    query: {method:'GET', isArray:true}
  });
}]);

wsService.factory('term', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/term/:termId', {termId: '@id'}, {
    query: {method:'GET'}
  });
}]);

wsService.factory('annotationUpdates', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/dataset', {}, {
    query: {method:'GET', isArray:true, Cache:true}
  });
}]);

wsService.factory('goTermHistory', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/dataset/goTermHistory', {from:'@from', to:'@to', limit:'@limit'}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('taxonConstraints', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/ws/dataset/taxonConstraints', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
}]);

wsService.factory('annotationBlacklist', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/dataset/annotationBlacklist', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('annotationPostProcessing', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/dataset/annotationPostProcessing', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('evidencetypes', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/evidencetypes', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('withDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/withdbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('assignDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/assigneddbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('ontologies', ['$resource', 'ENV', function($resource, ENV) {
  return $resource(ENV.apiEndpoint + '/ws/terms/:ontology', {ontology: '@ontology'}, {
    query: {method: 'GET', Cache: true}
  });
}]);

wsService.factory('search', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/search', {query: '@query', format:'JSON'}, {
    query: {method:'GET'}
  });
}]);

wsService.factory('searchfull', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/ws/searchfull', {text: '@text',format:'JSON', page:'@page', row:'@rows', viewBy:'@viewBy'}, {
    query: {method:'GET'}
  });
}]);
