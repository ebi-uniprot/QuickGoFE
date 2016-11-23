app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';


  var init = function () {
    presetsService.getPresetsEvidences().then(function (d) {
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
    $scope.$parent.addToQuery('evidenceCodeUsage', $scope.evidenceCodeUsage);
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  };

  $scope.reset = function () {
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.updateQuery();
  };

  $scope.addECOs = function () {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    angular.forEach(ecos, function (ecoID) {
      if (validationService.validateECOTerm(ecoID)) {
        if($scope.ecos[ecoID]) {
          $scope.ecos[ecoID].checked = true;
        } else {
          $scope.ecos[ecoID] = {
            'id':ecoID,
            'checked':true
          };
        }
      }
    });
    $scope.ecoTextArea = '';
  };

  init();
});