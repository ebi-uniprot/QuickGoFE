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
    'quickGoFeApp.services'
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

//app.controller('AnnotationListCtrl',['$scope', 'annotations',
//        function ($scope, annotations) {
//            $scope.annotations = annotations;
//        }]);

//app.controller('AnnotationListCtrl', ['$scope', 'Annotation', function($scope, Annotation) {
//    $scope.annotations = Annotation.query();
//}]);

app.controller('AnnotationListCtrl', function($scope) {
        $scope.annotations = [
    {'Gene_product_id' : 'A0A001',
                'Symbol' : 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''},
    {'Gene_product_id' : 'A0A002',
                'Symbol': 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''},
    {'Gene_product_id' : 'A0A003',
                'Symbol': 'moeA5',
                'Qualifier' : 'enables',
                'GO_Identifier' : 'GO:0003824',
                'GO_Term_Name' : 'catalytic activity ',
                'Aspect':'F',
                'Evidence':'ECO:0000256',
                'Reference':'GO_REF:0000002',
                'With':'InterPro:IPR015421| InterPro:IPR015422',
                'Taxon':'35758',
                'Assigned_By' : 'InterPro',
                'Annotation_Extension' : ''}];

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

      $scope.showCommonTaxon=function(taxon, filter){
        //if(filter!="" && filter!="false")
        //{
        //  if(taxon.taxId=='9606'|taxon.taxId=='10090'|taxon.taxId=='10116')
        //    return true;
        //  return false;
        //}
        return false;
      }

});
