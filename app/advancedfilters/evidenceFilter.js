app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService) {

  $scope.ecos = {};
  $scope.ecoTermUse = 'ancestor';


  var init = function () {
    presetsService.getPresets().then(function (d) {
      var evidences = d.data.evidences;
      var checked = [];
      if($scope.$parent.query.evidenceCode) {
        checked = checked.concat($scope.$parent.query.evidenceCode.split(','))
      }
      //The order of the evidence codes is important
      //var evidenceTypes = _.sortBy(evidences, 'evidenceGOID');
      angular.forEach(evidences, function (evidenceType) {
        evidenceType.checked = _.contains(checked, evidenceType.id);
        $scope.ecos[evidenceType.id] = evidenceType;
      });
    });
  };
  
  $scope.apply = function() {
    $scope.$parent.addToQuery('evidenceCode', getQuery());
  }
  
  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  }

  $scope.reset = function () {
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.updateQuery();
  }

  $scope.addECOs = function () {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    angular.forEach(ecos, function (ecoID) {
      if (validationService.validateECOTerm(ecoID)) {
        if($scope.ecos[ecoID]) {
          $scope.ecos[ecoID].checked = true;
        } else {
          var eco = {
            'id':ecoID,
            'checked':true
          }
          $scope.ecos[ecoID] = eco;
        }
      }
    });
    $scope.ecoTextArea = '';
  };

  init();
});