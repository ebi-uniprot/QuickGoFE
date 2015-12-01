angular
	.module('quickGoFeApp')
	.directive('chartIcon', ['chartService', function(chartService) {
		return {
      restrict: 'E',
			templateUrl: 'directives/chart.html',
      replace: true
    };
}]);



// 			link: function($scope, element, attrs, controller) {
//
//         attrs.$observe('termid', function() {
//           termId = attrs.termid;
//           $scope.inBasket = basketService.containsGoTerm(termId);
//         });
//
// //$scope.showOntologyGraph = function (termId, title) {
//         var modalInstance = $uibModal.open({
//           templateUrl: 'charts/ontologyGraphModal.html',
//           controller: 'OntologyGraphCtrl',
//           windowClass: 'app-modal-window',
//           scope: $scope,
//           resolve: {
//             graphModel: function () {
//               return {id:termId, name:title, scope:'GO'};
//             }
//           }
//         });
// 		}
