angular
	.module('quickGoFeApp')
	.directive('basketButton', ['basketService', function(basketService) {
		return {
			restrict: 'E',
			templateUrl: 'directives/basket.html',
			link: function($scope, element, attrs, controller) {
				var termId;
				$scope.hoverBasket = false ;


				attrs.$observe('termid', function() {
					termId = attrs.termid;
					$scope.inBasket = basketService.containsGoTerm(termId);
				});

				element.bind('click', function() {
					if (basketService.containsGoTerm(termId)) {
						basketService.removeBasketItem(termId);
					} else {
						basketService.addBasketItem(termId);
					}
					$scope.$emit('basketUpdate', basketService.basketQuantity());
					$scope.inBasket = basketService.containsGoTerm(termId);
					$scope.$apply();
				});

				$scope.getDataIcon = function() {
					if(!$scope.hoverBasket) {
						return 'b';
					} else if ($scope.inBasket) {
						return 'x';
					} else {
						return '/';
					}
				}
			}
		};
	}]);
