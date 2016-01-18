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
    'ngAnimate',
    'cgBusy',
    'quickGoFeApp.wsService',
    'app.quickGo.filters',
    'quickGoFeApp.BasketModule',
    'quickGoFeApp.HardCodedDataModule',
    'quickGoFeApp.FilteringModule',
    'quickGoFeApp.ServicesModule',
    "ui.bootstrap",
    'duScroll',
    'config'
  ]);


  app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

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
      .when('/help', {
        templateUrl: 'nav/help.html',
        controller: 'HelpCtrl'
      })
      .when('/term/:goId', {
        templateUrl: 'term/term.html',
        controller: 'TermCtrl'
      })
      .when('/slimming', {
        templateUrl: 'slimming/slimming.html',
        controller: 'GOSlimCtrl'
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
      .when('/annotations/filter', {
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
      .otherwise({
        redirectTo: '/'
      });
  });
