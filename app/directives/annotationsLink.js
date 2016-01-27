angular
	.module('quickGoFeApp')
	.directive('annotationsLink', ['searchService', function(searchService) {
		return {
			restrict: 'E',
			template: '{{annotationsCount}} annotations',
			scope: {},
			link: function($scope, element, attrs, controller) {
				var termId, productId;

				attrs.$observe('termid', function() {
					termId = attrs.termid;
					if(termId) {
						if(termId.startsWith('GO')) {
							searchService.findAnnotationsForTerm(termId).then(function(d){
								$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
							});
						} else if (termId.startsWith('ECO')) {
							searchService.findAnnotationsForECO(termId).then(function(d){
								$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
							});
						}
					}
				});

				attrs.$observe('productid', function() {
					productId = attrs.productid;
					if(productId) {
						searchService.findAnnotationsForProduct(productId).then(function(d){
							$scope.annotationsCount = d.data.numberAnnotations.toLocaleString();
						});
					}
				});
			}
		};
	}]);