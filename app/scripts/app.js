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


      //$scope.appliedFilters=[
      //  {'key':'taxon', 'ids': [{'id' : '9606'}, {'id': '10116'} ]},
      //  {'key':'protein ', 'ids': [{'id' : '123456'} ]},
      //  {'key':'goId  ', 'ids': [{'id' : 'GO:0008270'} ]}
      //];


    $scope.appliedFilters=[
      {'key':'taxon', 'id' : '9606'},
      {'key':'taxon', 'id': '10116'},
      {'key':'protein ', 'id' : '123456'},
      {'key':'goId', 'id' : 'GO:0008270'}
    ];


  //Remove filter from applied filters
  //parm: filter.key-filterValue
      $scope.removeFilter=function(filter) {
        var filterLen=-1;
        var i;

        for (i = 0,  filterLen = $scope.appliedFilters.length; i < filterLen; i++) {

          if($scope.appliedFilters[i].key==filter.key) {

            if ($scope.appliedFilters[i].id == filter.id) {
              delete $scope.appliedFilters[i];

            }
          }
        }
      }

  //$scope.removeFilter=function(filterKey, filterValue) {
  //  console.log('filterValue.id=' + filterValue.id);
  //  var filterLen=-1;
  //  var valuesLen=-1
  //  var i;
  //  var j;
  //  console.log($scope.appliedFilters.length);
  //  for (i = 0,  filterLen = $scope.appliedFilters.length; i < filterLen; i++) {
  //
  //    //Find filter type
  //
  //    if($scope.appliedFilters[i].key==filterKey){
  //      console.log('here2');
  //      if($scope.appliedFilters[i].ids.length==1){
  //
  //        //Delete all the applied filters for the type if only one type exists
  //        delete $scope.appliedFilters[i];
  //
  //      }else{
  //
  //        //loop through all values and delete what meets the criteria for value
  //        for (j = 0,  valuesLen =$scope.appliedFilters[i].ids.length; j < valuesLen; j++) {
  //
  //          console.log('asda!' + $scope.appliedFilters[i].ids[j].id)
  //
  //          if ($scope.appliedFilters[i].ids[j].id == filterValue.id) {
  //            delete $scope.appliedFilters[i].ids[j];
  //          }
  //        }
  //      }
  //    }
  //  }
  //}

});
