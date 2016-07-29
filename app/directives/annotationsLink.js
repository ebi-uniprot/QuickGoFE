angular
	.module('quickGoFeApp')
	.directive('annotationsLink', ['searchService', function(searchService) {
		return {
			restrict: 'E',
			template: '{{annotationsCount}} annotations',
			scope: {},
			link: function($scope, element, attrs) {
				var termId, productId;

				attrs.$observe('termid', function() {
					termId = attrs.termid;
					if(termId) {
						var isGoTerm = termId.indexOf("GO");
						if(isGoTerm >= 0){
							searchService.findAnnotationsForTerm(termId).then(function(d){
								$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
								showHide($scope.annotationsCount);
							});
						} else {
							searchService.findAnnotationsForECO(termId).then(function(d){
								$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
								showHide($scope.annotationsCount);
							});
						}
					}
				});

				attrs.$observe('productid', function() {
					productId = attrs.productid;
					if(productId) {
						searchService.findAnnotationsForProduct(productId).then(function(d){
							$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
							showHide($scope.annotationsCount);
						});
					}
				});

				var showHide = function(n) {
					if(n == 0) {
						element.parent().addClass('ng-hide');
					}
				}
			}
		};
	}]);
