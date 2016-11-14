app.controller('taxonFilter', function($scope, hardCodedDataService,
  stringService, validationService){

  $scope.taxonIds = [];

  var initTaxons = function(){
    var predefinedTaxons = hardCodedDataService.getMostCommonTaxonomies();
    angular.forEach(predefinedTaxons, function(taxon){
      taxon.checked = false;
      $scope.taxonIds.push(taxon);
    });
    if($scope.query.taxonId) {
      angular.forEach($scope.query.taxonId.split(','), function(taxon) {
        var match = _.findWhere($scope.taxonIds, {'taxId' : taxon});
        if (match) {
          match.checked = true;
        } else {
          $scope.taxonIds.push({
            'taxId': taxon,
            'checked': true
          });
        }
      });
    }
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('taxonId', getQuery());
  }

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxonIds, 'checked'), 'taxId');
  }

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    angular.forEach(taxons, function(taxonId){
      var match = _.find($scope.taxonIds, function(d){
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
        $scope.taxonIds.unshift(taxon);
      }
    });
    $scope.taxonTextArea = '';
  };

  initTaxons();
});
