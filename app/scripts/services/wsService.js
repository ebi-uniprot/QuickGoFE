'use strict';

var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);


wsService.factory('PreDefinedSlimSets', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/predefinedslims', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
  }]);

wsService.factory('PreDefinedSlimSetDetail', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/predefinedSetTerms/:setId', {setId: '@id'}, {
    query: {method:'GET', isArray:true}
  });
}]);

wsService.factory('termService', ['$http', 'ENV', function($http, ENV){
  //var
  return {
      getTerm : function(termId, isGoTerm) {
        return isGoTerm === true ? $http.get(ENV.apiEndpoint+'/go/terms/' + termId + '/complete')
            : $http.get(ENV.apiEndpoint+'/eco/terms/' + termId + '/complete') ;
      },
      getTerms : function(ids, isGoTerm, idKey) {
          //TODO revise that
          if (ids instanceof Array) {
              var termsToQuery = '';
              idKey = idKey ? idKey : 'id';
              angular.forEach(ids, function(value) {
                  termsToQuery += (value[idKey] ? value[idKey] : value) + ',';
              });
              ids = termsToQuery.slice(0, -1);
          }
          return isGoTerm === true ? $http.get(ENV.apiEndpoint+'/go/terms/' + ids)
              : $http.get(ENV.apiEndpoint+'/eco/terms/' + ids);
      },
      getGOTerms : function(ids) {
        return $http.get(ENV.apiEndpoint+'/go/terms/' + ids);
      },
      getStats : function(termId) {
        return $http.get(ENV.apiEndpoint+'/term/' + termId + '/costats');
      },
      getBlacklist : function(termId) {
      return $http.get(ENV.apiEndpoint+'/term/' + termId + '/blacklist');
    }
  };
}]);

wsService.factory('stringService', [function(){
  return {
    getTextareaItemsAsArray : function(str) {
      return _.uniq(str.replace( /\n/g, " " ).split(/[\s,]+/));
    }
  }
}]);

wsService.factory('ontoTypeService', [function(){
    return {
        isGoTerm : function(termId) {
            return !(termId.indexOf('ECO') === 0);
        },
        ontoOneLetterName: function(ontoName) {
            switch(ontoName) {
                case 'Biological Process' : return 'P';
                case 'Molecular Function' : return 'F';
                case 'Cellular Component' : return 'C';
                case 'biological_process' : return 'P';
                case 'molecular_function' : return 'F';
                case 'cellular_component' : return 'C';
                default: return ontoName;
            }
        },
        ontoReadableText: function(ontoName) {
            switch(ontoName) {
                case 'biological_process' : return 'Biological Process';
                case 'molecular_function' : return 'Molecular Function';
                case 'cellular_component' : return 'Cellular Component';
                default: return ontoName;
            }
        }
    }
}]);

wsService.factory('searchService', ['$http', 'ENV', function($http, ENV){
  return {
      findTerms: function(searchTerm, limit, page, facet, filters) {
        return $http.get(ENV.apiEndpointSearch,
          {
            params: {
              query : searchTerm,
              limit : limit,
              page : page ? page : 1,
              facet : facet ? facet : '',
              filterQuery : filters ? filters : ''
            }
          });
      },
      findGeneProducts: function(searchTerm, limit, page, facet, filters) {
        return $http.get(ENV.apiEndpointGeneProd + '/search',
          {
            params: {
              query : searchTerm,
              limit : limit,
              page : page ? page : 1,
              facet : facet ? facet : '',
              filterQuery : filters ? filters : ''
            }
          });
      },
      findPublications: function(searchTerm, limit) {
        //TODO
      },
      findAnnotationsWithFilter: function(filter) { //TODO filterRequest.list
          return $http.get(ENV.apiEndpointAnnotationSearch+'?page=' + filter.page + '&limit=' + filter.rows);
      },
      findAnnotationsForTerm: function(searchTerm) {
          return $http.get(ENV.apiEndpointAnnotationSearch+'?goId=' + searchTerm);
      },
      findAnnotationsForECO: function(searchTerm) {
          return $http.get(ENV.apiEndpointAnnotationSearch+'?ecoId=' + searchTerm);
      },
      findAnnotationsForProduct: function(searchTerm) {
          return $http.get(ENV.apiEndpointAnnotationSearch+'?geneProductId=' + searchTerm);
      }
  };
}]);

wsService.factory('dbXrefService', ['$http', '$location', function($http, $location){
  return {
    getDbXrefs: function() {
      return $http.get('https://s3.amazonaws.com/go-public/metadata/db-xrefs.json', {cache: true});
    },
    getGenericLink: function(name, xrefs) {
      var match = _.find(xrefs, function(xref){
        return xref.database === name || _.contains(xref.synonyms, name);
      });
      return match.generic_urls[0];
    },
    getLinkforId: function(name, id, xrefs) {
      //Overwrite for QuickGO instead of AMIGO
      if(name === 'GO') {
        return $location.absUrl().replace($location.path(), '/term/GO:' + id);
      } else {
        var match = _.find(xrefs, function(xref){
          return xref.database === name || _.contains(xref.synonyms, name);
        });
        return match.entity_types[0].url_syntax.replace('[example_id]', id);
      }
    }
  };
}]);

wsService.factory('olsService', ['$http', function($http) {
  return {
    getTermName: function(xref) {
      return $http.get('http://www.ebi.ac.uk/ols/api/ontologies/' + xref.db.toLowerCase() + '/terms/' + 'http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252F' + xref.db + '_' + xref.id);
    }
  };
}]);

wsService.factory('annotationUpdates', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset', {}, {
    query: {method:'GET', isArray:true, Cache:true}
  });
}]);

wsService.factory('goTermHistory', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset/goTermHistory', {from:'@from', to:'@to', limit:'@limit'}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('taxonConstraints', ['$resource', 'ENV', function($resource, ENV){
    return $resource(ENV.apiEndpoint+'/dataset/taxonConstraints', {}, {
      query: {method:'GET', isArray:true, Cache:true}
    });
}]);

wsService.factory('annotationPostProRules', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/other/annotationPostProRules', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('annotationBlacklist', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/dataset/annotationBlacklist', {}, {
    query: {method:'GET', Cache:true}
  });
}]);

wsService.factory('evidenceService', ['$http', 'ENV', function($http, ENV){
  return {
    getTypes: function() {
      return $http.get(ENV.apiEndpoint+'/evidencetypes');
    }  
  }
}]);

wsService.factory('withDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/withdbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('assignDBs', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/assigneddbs', {}, {
    query: {method:'GET',  isArray:true, Cache:true}
  });
}]);

wsService.factory('ontologies', ['$resource', 'ENV', function($resource, ENV) {
  return $resource(ENV.apiEndpoint + '/terms/:ontology', {ontology: '@ontology'}, {
    query: {method: 'GET', Cache: true}
  });
}]);

wsService.factory('search', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/search', {query: '@query', format:'JSON'}, {
    query: {method:'GET'}
  });
}]);

//@deprecated
wsService.factory('searchfull', ['$resource', 'ENV', function($resource, ENV){
  return $resource(ENV.apiEndpoint+'/searchfull', {text: '@text',format:'JSON', page:'@page', row:'@rows', viewBy:'@viewBy'}, {
    query: {method:'GET'}
  });
}]);
