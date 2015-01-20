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
    'quickGoFeApp.services',
    'app.quickGo.filters'
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
      .otherwise({
        redirectTo: '/'
      });
  });

app.controller('StartCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});


app.controller('AnnotationListCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {

  /**
   * Get data from the server
   * @type {string}
   */
  var formattedURL='http://localhost:9080/ws/annotation?format=json';
  $http.get(formattedURL).success(function(data) {
    console.log("got the response back >>>>" + data);

    //{"protein":"A0A000",
    // "symbol":null,
    // "qualifier":"enables",
    // "goId":"GO:0003824",
    // "termName":null,
    // "aspect":null,
    // "evidenceGo":"IEA",
    // "evidenceEco":"ECO:0000256",
    // "reference":"GO_REF:0000002",
    // "with":"InterPro:IPR015421|InterPro:IPR015422",
    // "taxon":0,"assignedBy":"InterPro",
    // "database":"UniProtKB",
    // "date":"20141025",
    // "name":null,
    // "synonym":null,
    // "type":null,
    // "taxonName":null,"sequence":0,
    // "originalTermId":null,"originalTermName":null}

    $scope.goList = data;
  });


        $scope.annotationColumns =[
            {'name':'colGeneProductID', 'value':'Gene Product ID'},
            {'name':'colSymbol', 'value':'Symbol'},
            {'name':'colQualifier', 'value':'Qualifier'},
            {'name':'colGOIdentifier', 'value':'GO Identifier'},
            {'name':'colGOTermName', 'value':'GO Term Name'},
            {'name':'colAspect', 'value':'Aspect'},
            {'name':'colEvidence', 'value':'Evidence'},
            {'name':'colReference', 'value':'Reference'},
            {'name':'colWith', 'value':'With'},
            {'name':'colTaxon', 'value':'Taxon'},
            {'name':'colAssignedBy', 'value':'Assigned By'},
            {'name':'colAnnotationExtension', 'value':'Annotation Extension'}];

        $scope.mostCommonTaxonomies =[

          {'taxId':'9606', 'title':'Homo sapiens'},
          {'taxId':'10090', 'title':'Mus musculus'},
          {'taxId':'10116', 'title':'Rattus norvegicus'},
          {'taxId':'3702', 'title':'Arabidopsis thaliana'},
          {'taxId':'559292', 'title':'Saccharomyces cerevisiae (strain ATCC 204508 / S288c)'},
          {'taxId':'284812', 'title':'Schizosaccharomyces pombe (strain 972 / ATCC 24843)'},
          {'taxId':'83333', 'title':'Escherichia coli (strain K12)'},
          {'taxId':'6239', 'title':'Caenorhabditis elegans'},
          {'taxId':'7955', 'title':'Danio rerio'},
          {'taxId':'44689', 'title':'Dictyostelium discoideum'},
          {'taxId':'7227', 'title':'Drosophila melanogaster'},
          {'taxId':'9031', 'title':'Gallus gallus'},
          {'taxId':'9913', 'title':'Bos taurus'}]

      $scope.showCommonTaxon=function(taxon, showAll){

        if($scope.showAll==="" || $scope.showAll==='false')
        {
          //Only show selected
          if(taxon.taxId=='9606'|taxon.taxId=='10090'|taxon.taxId=='10116')
            return true;
          return false;
        }
        return true;
      }


    $scope.appliedFilters=[
      {'key':'taxon', 'id' : '9606'},
      {'key':'taxon', 'id': '10116'},
      {'key':'protein ', 'id' : '123456'},
      {'key':'goId', 'id' : 'GO:0008270'}
    ];


  /**
   * Remove filter from applied filters
   * @param filter
   */
      $scope.removeFilter=function(filter) {
        var filterLen = -1;
        var i;

        for (i = 0, filterLen = $scope.appliedFilters.length; i < filterLen; i++) {

          if ($scope.appliedFilters[i].key == filter.key) {

            if ($scope.appliedFilters[i].id == filter.id) {
              delete $scope.appliedFilters[i];

            }
          }
        }
      }


  //**********************************************


  /**
   * Show/Don't show the basket pop-up
   * @type {boolean}
   */
  $scope.isBasketShow = false;
  $scope.showBasket = function(){
    if($scope.isBasketShow==true){
      $scope.isBasketShow=false;
    }else{
      $scope.isBasketShow=true;
    }
  }


  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.basketList = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [];

  $scope.addItem = function(goId, termName){
    console.log("Add to cookie" + goId);
    var basketItem = {goId:goId, termName:termName};
    $scope.basketList.push(basketItem);
    $cookieStore.put('uk.ac.ebi.quickgo.basket', $scope.basketList);
  }


  /**
   * Remove an item from the basket
   * @param basketItem
   */
  $scope.removeBasketItem=function(basketItem) {

    console.log("Remove from cookie" + basketItem.goId);
    var basketLen = -1;
    var i;

    for (i = 0, basketLen = $scope.basketList.length; i < basketLen; i++) {
      if($scope.basketList[i].goId==basketItem.goId){
        $scope.basketList.splice(i,1);
        return;
      }
    }
  }


}]);
