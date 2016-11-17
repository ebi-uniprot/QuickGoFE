'use strict';

var wsService = angular.module('quickGoFeApp.wsService', ['ngResource']);

wsService.factory('presetsService', ['$http', 'ENV',
  function ($http, ENV) {
    return {
        getPresetsAssignedBy: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=assignedBy');
        },
        getPresetsReferences: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=references');
        },
        getPresetsEvidences: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=evidences');
        },
        getPresetsWithFrom: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=withFrom');
        },
        getPresetsGeneProducts: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=geneProducts');
        },
        getPresetsGOSlimSets: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=goSlimSets');
        },
        getPresetsTaxa: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=taxons');
        },
        getPresetsAspects: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=aspects');
        },
        getPresetsGeneProductTypes: function() {
            return $http.get(ENV.apiEndpoint + '/internal/presets?fields=geneProductTypes');
        }
    }
  }]);

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
      getGOTerms : function(ids) {
        return $http.get(ENV.apiEndpoint+'/ontology/go/terms/' + ids);
      },
      getECOTerms : function(ids) {
        return $http.get(ENV.apiEndpoint+'/ontology/eco/terms/' + ids);
      },
      getStats : function(termId) {
        return $http.get(ENV.apiEndpoint+'/term/' + termId + '/costats');
      },
      getBlacklist : function(termId) {
      return $http.get(ENV.apiEndpoint+'/term/' + termId + '/blacklist');
    }
  };
}]);

wsService.factory('taxonomyService', ['$http', function($http){
    return {
        getTaxa : function(ids) {
            return $http.get('http://www.ebi.ac.uk/proteins/api/taxonomy/ids/' + ids.join(',') + '/node');
        }
    };
}]);

wsService.factory('geneProductService', ['$http', 'ENV', function($http, ENV){
    return {
        getGeneProducts : function(ids) {
            if (typeof ids === Array) {
                return $http.get(ENV.apiEndpoint + '/geneproduct/' + ids.join(','));
            } else {
                return $http.get(ENV.apiEndpoint + '/geneproduct/' + ids);
            }
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
        return $http.get(ENV.apiEndpoint + '/internal/search/ontology',
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
        var url = ENV.apiEndpoint + '/geneproduct/search?query=' + searchTerm + "&limit=" + limit +
            '&page=' + (page ? page : 1) + '&facet=' + (facet ? facet : '') + '&' + (filters ? filters : '');
        return $http.get(url);
      },
      findPublications: function(searchTerm, limit) {
        //TODO
      },
      findAnnotations: function(page, size, filters) {
          return $http.get(ENV.apiEndpoint+'/annotation/search?page=' + page + '&limit=' + size + '&' + filters);
      },
      findAnnotationsForTerm: function(searchTerm) {
          return $http.get(ENV.apiEndpoint + '/annotation/search?goId=' + searchTerm);
      },
      findAnnotationsForECO: function(searchTerm) {
          return $http.get(ENV.apiEndpoint + '/annotation/search?ecoId=' + searchTerm);
      },
      findAnnotationsForProduct: function(searchTerm) {
          return $http.get(ENV.apiEndpoint+'/annotation/search?geneProductId=' + searchTerm);
      },
      serializeQuery: function(query) {
        var queryString = '';
        angular.forEach(query, function(values, key) {
          if(values) {
            queryString = queryString + '&' + key + '=' + values;
          }
        });
        return queryString;
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
      } else if (name === 'TAXON') {
          return 'http://www.uniprot.org/taxonomy/' + id;
      } else if (name === 'PMID') {
          return 'http://europepmc.org/abstract/MED/' + id;
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
    getTermName: function(db, id) {
      return $http.get('http://www.ebi.ac.uk/ols/api/ontologies/' + db.toLowerCase() + '/terms/' + 'http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252F' + db + '_' + id);
    }
  };
}]);

wsService.factory('chartService', ['$http', 'ENV', function($http, ENV){
  return {
    getGOChart: function(ids) {
      return $http.get(ENV.apiEndpoint + '/ontology/go/terms/' + ids + '/chart');
    },
    getGOImageMap: function(ids) {
      return $http.get(ENV.apiEndpoint + '/ontology/go/terms/' + ids + '/chart/coords');
    }
  }
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
