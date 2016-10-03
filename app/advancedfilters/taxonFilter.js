app.controller('taxonFilter', function($scope, hardCodedDataService,
  stringService, validationService){

  var initTaxons = function(){
    $scope.taxons = hardCodedDataService.getMostCommonTaxonomies();
    angular.forEach($scope.taxons, function(taxon){
      taxon.checked = false;
    });
  };

  $scope.reset = function() {
    initTaxons();
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    angular.forEach(taxons, function(taxonId){
      var match = _.find($scope.taxons, function(d){
        return d.taxId === taxonId;
      });
      if(match) {
        match.checked = true;
      } else if(validationService.validateTaxon(taxonId)) {
        var taxon = {
          taxId: taxonId,
          title: '',
          checked: true
        }
        $scope.taxons.unshift(taxon);
      }
    });
    $scope.taxonTextArea = '';
  };

  initTaxons();
});
