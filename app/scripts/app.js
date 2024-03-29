'use strict';

var app = angular.module('quickGoFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'cgBusy',
  'quickGoFeApp.wsService',
  'app.quickGo.filters',
  'quickGoFeApp.BasketModule',
  'quickGoFeApp.HardCodedDataModule',
  'quickGoFeApp.ValidationModule',
  'quickGoFeApp.ServicesModule',
  'quickGoFeApp.errorHandling',
  'duScroll',
  'config',
  'mm.foundation',
  'angulartics',
  'angulartics.google.analytics',
  'ngFileSaver'
]);

app.run(function($rootScope, dbXrefService, $window) {
  $rootScope.followLinkToGeneric = function(database) {
    dbXrefService.getDbXrefs().then(function(xrefs) {
      $window.open(dbXrefService.getGenericLink(database, xrefs.data));
    });
  };

  $rootScope.alerts = [];

  $rootScope.stackErrors = function(elements, type, message, field) {
    $rootScope.alerts = $rootScope.alerts.concat(
      _.map(elements, function(elem) {
        return {
          type: type,
          msg: (field ? elem[field] : elem) + ' ' + message
        };
      })
    );
  };

  $rootScope.followLinkToEntry = function(id, database) {
    var pos = String(id).indexOf(':');

    if (!database) {
      if (pos > 0) {
        database = id.substring(0, pos);
        id = id.substring(pos + 1);
      } else {
        throw "The 'id' and/or 'database' value is invalid.";
      }
    } else if (pos > 0) {
      id = id.substring(0, pos);
    }

    dbXrefService.getDbXrefs().then(function(xrefs) {
      $window.open(dbXrefService.getLinkforId(database, id, xrefs.data));
    });
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
});

app.config(function($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('httpErrorResponseInterceptor');

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/);

  $routeProvider
    .when('/', {
      templateUrl: 'main/start.html',
      controller: 'StartCtrl'
    })
    .when('/GAnnotation', {
      templateUrl: 'annotationsList/annotations.html',
      controller: 'Annotations'
    })
    .when('/GProtein', {
      templateUrl: 'annotationsList/annotations.html',
      controller: 'Annotations'
    })
    .when('/annotations', {
      templateUrl: 'annotationsList/annotations.html',
      controller: 'Annotations'
    })
    .when('/webservices', {
      templateUrl: 'nav/webservices.html',
      controller: 'WebServicesCtrl'
    })
    .when('/dataset', {
      templateUrl: 'dataset/dataset.html',
      controller: 'DataSetCtrl'
    })
    .when('/dataset/goTermHistory', {
      templateUrl: 'dataset/goTermHistory.html',
      controller: 'GoTermHistoryCtrl'
    })
    .when('/dataset/taxonConstraints', {
      templateUrl: 'dataset/taxonConstraints.html',
      controller: 'TaxonConstraintsCtrl'
    })
    .when('/dataset/annotationBlacklist', {
      templateUrl: 'dataset/annotationBlacklist.html',
      controller: 'AnnotationBlacklistCtrl'
    })
    .when('/help', {
      templateUrl: 'help/help.html',
      controller: 'HelpCtrl'
    })
    .when('/help/searching', {
      templateUrl: 'help/searching.html',
      controller: 'HelpCtrl'
    })
    .when('/help/basket', {
      templateUrl: 'help/basket.html',
      controller: 'HelpCtrl'
    })
    .when('/help/slims', {
      templateUrl: 'help/slims.html',
      controller: 'HelpCtrl'
    })
    .when('/help/doc', {
      templateUrl: 'help/doc.html',
      controller: 'HelpCtrl'
    })
    .when('/faq/amigo', { templateUrl: 'faq/amigo.html' })
    .when('/faq/gene_product_export', { templateUrl: 'faq/gene_product_export.html' })
    .when('/faq/gp_list', { templateUrl: 'faq/gp_list.html' })
    .when('/faq/export_limit', { templateUrl: 'faq/export_limit.html' })
    .when('/faq/filter_limits', { templateUrl: 'faq/filter_limits.html' })
    .when('/faq/human_proteome', { templateUrl: 'faq/human_proteome.html' })
    .when('/faq/ids', { templateUrl: 'faq/ids.html' })
    .when('/faq/manual_annotations', { templateUrl: 'faq/manual_annotations.html' })
    .when('/faq/map_gp', { templateUrl: 'faq/map_gp.html' })
    .when('/faq/pubmed_ref', { templateUrl: 'faq/pubmed_ref.html' })
    .when('/faq/slims', { templateUrl: 'faq/slims.html' })
    .when('/faq/webservices', { templateUrl: 'faq/webservices.html' })
    .when('/term/:goId', {
      templateUrl: 'term/term.html',
      controller: 'TermCtrl'
    })
    .when('/GTerm', {
      templateUrl: 'term/term.html',
      controller: 'TermCtrl'
    })
    .when('/GProteinSet', {
      templateUrl: 'targetSet/targetSet.html',
      controller: 'TargetSetCtrl'
    })
    .when('/slimming', {
      templateUrl: 'slims/slimming.html',
      controller: 'GOSlimCtrl'
    })
    .when('/terms/P', {
      templateUrl: 'simplelist/ontologyTerms.html',
      controller: 'OntologyTermsCtrl'
    })
    .when('/terms/F', {
      templateUrl: 'simplelist/molecularfunction.html',
      controller: 'MolecularFunctionListCtrl'
    })
    .when('/terms/C', {
      templateUrl: 'simplelist/cellularcomponent.html',
      controller: 'CellularComponentListCtrl'
    })
    // .when('/annotationExtensionRelations', {   templateUrl:
    // 'views/annotationExtensionRelations.html',   controller:
    // 'AnnotationExtensionRelationsCtrl' })
    .when('/feedback', {
      templateUrl: 'nav/feedback.html',
      controller: 'FeedbackCtrl'
    })
    .when('/search/:searchTerm', {
      templateUrl: 'search/search.html',
      controller: 'SearchCtrl'
    })
    .when('/searchterms/:searchTerm', {
      templateUrl: 'searchterms/searchTerms.html',
      controller: 'FacetSearchCtrl'
    })
    .when('/searchproducts/:searchTerm', {
      templateUrl: 'searchproducts/searchProducts.html',
      controller: 'FacetSearchCtrl'
    })
    .when('/other', {
      templateUrl: 'other/other.html',
      controller: 'OtherCtrl'
    })
    .when('/chart', {
      templateUrl: 'term/chartPage.html',
      controller: 'ChartPageCtrl'
    })
    .when('/404', { templateUrl: 'errors/404.html' })
    .when('/targetset/:gpSetName', {
      templateUrl: 'targetSet/targetSet.html',
      controller: 'TargetSetCtrl'
    })
    .when('/annotationExtensionRelations', {
      templateUrl: 'views/annotationExtensionRelations.html'
    })
    .otherwise({ redirectTo: '/' });
});
