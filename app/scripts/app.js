'use strict';

/**
 * @ngdoc overview
 * @name quickGoFeApp
 * @description
 * # quickGoFeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('quickGoFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'quickGoFeApp.wsService',
    'app.quickGo.filters',
    'angularUtils.directives.dirPagination',
    'quickGoFeApp.BasketModule',
    'quickGoFeApp.HardCodedDataModule',
    'quickGoFeApp.WizardModule',
    'quickGoFeApp.FilteringModule',
    "ui.bootstrap",
    'cgBusy'
  ]);

  app.config(function ($routeProvider) {
        console.log($routeProvider);
    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .when('/annotations', {
        templateUrl: 'views/annotationList.html',
        controller: 'AnnotationListCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/documentation', {
        templateUrl: 'views/documentation.html',
        controller: 'DocumentationCtrl'
      })
      .when('/webservices', {
        templateUrl: 'views/webservices.html',
        controller: 'WebServicesCtrl'
      })
      .when('/dataset', {
        templateUrl: 'views/dataset.html',
        controller: 'DataSetCtrl'
      })
      .when('/dataset/goTermHistory', {
        templateUrl: 'views/goTermHistory.html',
        controller: 'GoTermHistoryCtrl'
      })
      .when('/dataset/taxonConstraints', {
        templateUrl: 'views/taxonConstraints.html',
        controller: 'TaxonConstraintsCtrl'
      })
      .when('/dataset/annotationBlacklist', {
        templateUrl: 'views/annotationBlacklist.html',
        controller: 'AnnotationBlacklistCtrl'
      })
      .when('/dataset/annotationPostProcessing', {
        templateUrl: 'views/annotationPostProcessing.html',
        controller: 'AnnotationPostProcessingCtrl'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl'
      })
      .when('/term/:goId', {
        templateUrl: 'views/term/term.html',
        controller: 'TermCtrl'
      })
      .when('/slimming', {
        templateUrl: 'slimming/slimming1.html',
        controller: 'GOSlimCtrl1'
      })
      .when('/slimming2', {
        templateUrl: 'slimming/slimming2.html',
        controller: 'GOSlimCtrl2'
      })
      .when('/statistics', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl'
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
      .when('/bookmark/:filterParms', {
        templateUrl: 'views/annotationList.html',
        controller: 'BookmarkCtrl'
      })
      .when('/annotationExtensionRelations', {
        templateUrl: 'views/annotationExtensionRelations.html',
        controller: 'AnnotationExtensionRelationsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  app.config(function(paginationTemplateProvider) {
    //paginationTemplateProvider.setPath('scripts/directives/pagination/dirPagination.tpl.html');
    paginationTemplateProvider.setPath('views/controls/quickgoDirPagination.tpl.html');
  });

  app.value('targetDomainAndPort','http://localhost:9080');
  //app.value('targetDomainAndPort','http://localhost:8080/quickgows');

  app.value('feDomainAndPort','http://localhost:9000');


