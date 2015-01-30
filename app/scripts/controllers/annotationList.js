/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', ['$scope', '$http', 'basketService', function($scope, $http, basketService) {

  $scope.countBasket = basketService.getItems().length;
  $scope.isBasketShow = false;
  $scope.rowsPerPage = 25; // this should match however many results your API puts on one page
  getResultsPage(1);

  $scope.pagination = {
    current: 1
  };


  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  function getResultsPage(pageNumber) {

    var formattedURL='http://localhost:9080/ws/annotationjson?format=json&page='+ pageNumber +'&rows=25';
    $http.get(formattedURL).success(function(data) {
      console.log("got the response back >>>>" + data);
      $scope.goList = data;
      $scope.totalAnnotations = 299000000;
    })
  }


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


  /**
   * Show the common taxons used for filtering
   * @param taxon
   * @param showAll
   * @returns {boolean}
   */
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

  /**
   * Show/Don't show the basket pop-up
   * @type {boolean}
   */

  $scope.showBasket = function(){
    if($scope.isBasketShow==true){
      $scope.isBasketShow=false;
    }else{
      $scope.isBasketShow=true;
    }
  }


  ///**
  // * Add an item to the basket
  // * @type {Object|Array}
  // */
  //$scope.basketList = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [];
  //
  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket = basketService.getItems().length;
  }


}]);
