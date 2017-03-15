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
    };
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
        return $http.get(ENV.apiEndpoint + '/ontology/go/terms/' + ids);
      },
      getECOTerms : function(ids) {
        return $http.get(ENV.apiEndpoint + '/ontology/eco/terms/' + ids);
      },
      getGOCompleteTerms : function(ids) {
          return $http.get(ENV.apiEndpoint + '/ontology/go/terms/' + ids + '/complete');
      },
      getECOCompleteTerms : function(ids) {
          return $http.get(ENV.apiEndpoint + '/ontology/eco/terms/' + ids + '/complete');
      },
      getAllStats : function(termId, limit) {
        return $http.get(ENV.apiEndpoint + '/ontology/go/coterms/' + termId +
            (limit ? '?limit=' + limit : ''));
      },
      getManualStats : function(termId, limit) {
          return $http.get(ENV.apiEndpoint + '/ontology/go/coterms/' + termId + '?source=MANUAL' +
              (limit ? '&limit=' + limit : ''));
      },
      getBlacklist : function(termId) {
      return $http.get(ENV.apiEndpoint + '/term/' + termId + '/blacklist');
    }
  };
}]);

wsService.factory('taxonomyService',
  ['$http', 'presetsService', 'filterService', 'stringService', 'validationService', '$rootScope', '$q',
  function($http, presetsService, filterService, stringService, validationService, $rootScope, $q){
    var removeTaxIds = function(idsToRemove, taxa) {
      return _.filter(taxa, function(d){
          return !_.contains(idsToRemove, parseInt(d.id));
      });
    };
    var redirectTaxa = function(taxaInfo, redirections) {
      var redirectionMap = _.indexBy(redirections, 'requestedId');
      return _.map(taxaInfo, function(d){
          if(redirectionMap[d.id]) {
              var updatedId = redirectionMap[d.id]
                  .redirectLocation.substring(redirectionMap[d.id].redirectLocation.lastIndexOf('/')+1);
              $rootScope.alerts.push({msg: d.id + ' was updated to ' + updatedId});
              d.id = updatedId;
          }
          return d;
      });
    };
    return {
      getTaxa: function (ids) {
        return $http.get('http://www.ebi.ac.uk/proteins/api/taxonomy/ids/' + ids.join(',') + '/node');
      },
      initTaxa: function (taxaArray) {
          presetsService.getPresetsTaxa().then(function (resp) {
              var presetItems = filterService.getPresetFilterItems(resp.data.taxons, 'name');
              taxaArray = filterService.mergeRightToLeft(taxaArray, presetItems);
          });
      },
      updateTaxonInfo: function(defer, taxaArray) {
          var self = this;
          self.getTaxa(_.pluck(taxaArray,'id')).then(function(data){
              filterService.enrichFilterItemObject(taxaArray, data.data.taxonomies, 'taxonomyId');
              if(data.data.errors) {
                  // remove from list
                  var obsoleteIds = _.pluck(data.data.errors, 'requestedId');
                  $rootScope.alerts = _.map(data.data.errors, function(message){
                    return {
                        msg: message.requestedId + ': ' + message.errorMessage
                    };
                  });
                  taxaArray = removeTaxIds(obsoleteIds, taxaArray);
              }
              if(data.data.redirects) {
                  // update object in list
                  taxaArray = redirectTaxa(taxaArray, data.data.redirects);
                  self.updateTaxonInfo(defer, taxaArray);
              } else {
                  defer.resolve(taxaArray);
              }
          });
      },
      addNewTaxa: function(taxaArray, taxonTextArea) {
          var defer = $q.defer();
          var taxons = stringService.getTextareaItemsAsArray(taxonTextArea);
          var items = filterService.addFilterItems(taxons, validationService.validateTaxon);
          taxaArray = filterService.mergeRightToLeft(items, taxaArray);
          this.updateTaxonInfo(defer, taxaArray);
          return defer.promise;
      }
    }
}]);

wsService.factory('downloadService', ['$http', function($http){
    return {
        getAnnotationsData : function(accept, limit, filters) {
            var url = 'http://wwwdev.ebi.ac.uk/QuickGO/services/annotation/downloadSearch';
            var params = _.extend(filters, {downloadLimit: limit});
            return $http.get(url, {
              params: params,
              headers: {
                accept: 'text/' + accept
              }
            });
        },
        getMaxLimit: function() {
            return 50000;
        }
    };
}]);

wsService.factory('geneProductService', ['$http', 'ENV', function($http, ENV){
    return {
        getGeneProducts: function(ids) {
            if (typeof ids === Array) {
                return $http.get(ENV.apiEndpoint + '/geneproduct/' + ids.join(','));
            } else {
                return $http.get(ENV.apiEndpoint + '/geneproduct/' + ids);
            }
        },
        getTargetSet: function(id) {
            return $http.get(ENV.apiEndpoint + '/geneproduct/targetset/' + id);
        }
    };
}]);

wsService.factory('stringService', [function(){
  return {
    getTextareaItemsAsArray : function(str) {
      return _.uniq(str.replace( /\n/g, ' ').split(/[\s,]+/));
    }
  };
}]);

wsService.factory('ontoTypeService', [function(){
    return {
        isGoTerm : function(termId) {
            return (termId.indexOf('ECO') !== 0);
        },
        ontoReadableText: function(ontoName) {
            switch(ontoName) {
                case 'biological_process' : return 'Biological Process';
                case 'molecular_function' : return 'Molecular Function';
                case 'cellular_component' : return 'Cellular Component';
                default: return ontoName;
            }
        }
    };
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
        var url = ENV.apiEndpoint + '/geneproduct/search?query=' + searchTerm + '&limit=' + limit +
            '&page=' + (page ? page : 1) + '&facet=' + (facet ? facet : '') + '&' + (filters ? filters : '');
        return $http.get(url);
      },
      /*findPublications: function(searchTerm, limit) {
        //TODO
      },*/
      findAnnotations: function(page, size, filters) {
          return $http.get(ENV.apiEndpoint+'/annotation/search?page=' + page + '&limit=' + size + '&' + filters);
      },
      findAnnotationStatistics: function(filters) {
          return $http.get(ENV.apiEndpoint+'/annotation/stats?' + filters);
      },
      getAnnotationsForTermUrl: function(searchTerm) {
        return 'goUsage=descendants&goUsageRelationships=is_a,part_of,occurs_in&goId=' + searchTerm;
      },
      getAnnotationsForECOUrl: function(searchTerm) {
        return 'evidenceCodeUsage=descendants&evidenceCode=' + searchTerm;
      },
      getAnnotationsForProductUrl: function(searchTerm) {
        return 'geneProductId=' + searchTerm;
      },
      findAnnotationsForFilterUrl: function(url) {
        return $http.get(ENV.apiEndpoint + '/annotation/search?' + url);
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
    },
    getECOChart: function(ids) {
      return $http.get(ENV.apiEndpoint + '/ontology/eco/terms/' + ids + '/chart');
    },
    getECOImageMap: function(ids) {
      return $http.get(ENV.apiEndpoint + '/ontology/eco/terms/' + ids + '/chart/coords');
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
