'use strict';
angular
	.module('quickGoFeApp')
	.directive('basketButton', ['basketService', '$rootScope', function(basketService, $rootScope) {
		return {
			restrict: 'E',
			templateUrl: 'directives/basket.html',
      scope: {
				termid: '@',
				icondisabled: '@'
			},
			link: function($scope, element) {
				$scope.showIcon = true;

        $scope.inBasket = basketService.containsGoTerm($scope.termid);
        if($scope.termid.lastIndexOf('ECO', 0) === 0){
          $scope.showIcon = false;
        }

        var getClass = function() {
          if($scope.icondisabled === 'true') {
            return 'basket-disabled';
          } else if($scope.inBasket) {
			return 'basket-added';
		  } else {
			return 'basket-default';
		  }
        };

        $scope.className = getClass();

				element.bind('click', function() {
						if (basketService.containsGoTerm($scope.termid)) {
							basketService.removeBasketItem($scope.termid);
						} else {
							basketService.addBasketItem($scope.termid);
						}
            $rootScope.$emit('basketUpdate', basketService.basketQuantity());
						$scope.inBasket = basketService.containsGoTerm($scope.termid);
            $scope.className = getClass();
						$scope.$apply();
				});

        $rootScope.$on('basketUpdate', function(){
						$scope.inBasket = basketService.containsGoTerm($scope.termid);
            $scope.className = getClass();
        });
      }
		};
	}]);
