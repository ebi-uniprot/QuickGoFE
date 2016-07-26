angular
	.module('quickGoFeApp')
	.directive('chartIcon', ['$http','$uibModal', function($http, $uibModal) {
		return {
			restrict: 'E',
			scope: {
				termId: '=',
				termName: '='
			},
			templateUrl: 'directives/chart.html',
			link: function(scope) {
				scope.createChart = function() {
					$uibModal.open({
						templateUrl: 'charts/ontologyGraphModal.html',
						controller: 'OntologyGraphCtrl',
						windowClass: 'app-modal-window',
						scope: scope,
						resolve: {
							graphModel: function() {
								return {
									id: scope.termId,
									name: scope.termName,
									scope: 'GO'
								};
							}
						}
					});
				}
			}
		};
	}]);