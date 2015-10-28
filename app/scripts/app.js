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
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'quickGoFeApp.wsService',
    'app.quickGo.filters',
    'quickGoFeApp.BasketModule',
    'quickGoFeApp.HardCodedDataModule',
    'quickGoFeApp.WizardModule',
    'quickGoFeApp.FilteringModule',
    'quickGoFeApp.ServicesModule',
    "ui.bootstrap",
    'cgBusy',
    'duScroll'
  ]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/start.html',
        controller: 'StartCtrl'
      })
      .when('/annotations', {
        templateUrl: 'annotationsList/annotationList.html',
        controller: 'AnnotationListCtrl'
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
      .when('/dataset/annotationPostProcessing', {
        templateUrl: 'dataset/annotationPostProcessing.html',
        controller: 'AnnotationPostProcessingCtrl'
      })
      .when('/help', {
        templateUrl: 'nav/help.html',
        controller: 'HelpCtrl'
      })
      .when('/term/:goId', {
        templateUrl: 'term/term.html',
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
        templateUrl: 'statistics/statistics.html',
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
      .when('/annotations/:filterParms', {
        templateUrl: 'annotationsList/annotationList.html',
        controller: 'BookmarkCtrl'
      })
      .when('/annotationExtensionRelations', {
        templateUrl: 'views/annotationExtensionRelations.html',
        controller: 'AnnotationExtensionRelationsCtrl'
      })
      .when('/feedback', {
        templateUrl: 'nav/feedback.html',
        controller: 'FeedbackCtrl'
      })
      .when('/search/:searchTerm', {
        templateUrl: 'search/searchResult.html',
        controller: 'SearchResultCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  //Developer test
  // app.value('targetDomainAndPort','http://localhost:9080');
  app.value('feDomainAndPort','http://localhost:9000');

  //Production test
  app.value('targetDomainAndPort','http://www.ebi.ac.uk/QuickGO-Beta');
  // app.value('feDomainAndPort','http://wwwdev.ebi.ac.uk/QuickGO-Test');