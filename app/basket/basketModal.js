'use strict';
angular
  .module('quickGoFeApp')
  .directive('basketModal', ['$modal', 'basketService', '$rootScope', '$location', '$cookieStore', 'validationService',
    function($modal, basketService, $rootScope, $location, $cookieStore, validationService) {
    return {
      restrict: 'E',
      templateUrl: 'basket/basketModal.html',
      link: function(scope) {

        scope.countBasket = basketService.basketQuantity();

        $rootScope.$on('basketUpdate', function() {
          scope.countBasket = basketService.basketQuantity();
        });

        scope.openBasket = function() {
          $modal.open({
            templateUrl: 'basketModalContent.html',
            size: 'large',
            controller: function($scope, $modalInstance) {

              // This is silly angular stuff...the scope of the modal is below the
              // current scope, so $scope.inputTerms doesn't work but $scope.object.attribute does...
              $scope.form = {
                inputTerms:null
              };

              $scope.loadBasketItems = function() {
                var cookieItems = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
                if (cookieItems.length === 0) {
                  $scope.basketItems = [];
                } else {
                  $scope.basketPromise = basketService.getItems();
                  $scope.basketPromise.then(function(d){
                    $scope.basketItems = d.data.results;
                    $scope.basketIds = _.pluck($scope.basketItems, 'id').join(',');
                  });
                }
              };

              $scope.loadBasketItems();

              $scope.removeItem = function(basketItem){
                basketService.removeBasketItem(basketItem.id);
                $scope.loadBasketItems();
                $rootScope.$emit('basketUpdate', basketService.basketQuantity());
              };

              // Add items to basket
              $scope.submit = function() {
                var terms = $scope.form.inputTerms;
                console.log(terms);
                angular.forEach(terms.split(','), function(term) {
                  if(validationService.validateGOTerm(term)) {
                    basketService.addBasketItem(term);
                  }
                });
                $scope.loadBasketItems();
                $rootScope.$emit('basketUpdate', basketService.basketQuantity());
                $scope.form.inputTerms = '';
              };


              $scope.filterUsingBasketTerms = function () {
                $location.search('goId', _.pluck($scope.basketItems, 'id').join(','));
                $location.path('annotations');
                $modalInstance.close();
              };

              $scope.emptyBasket = function () {
                $scope.basketItems = basketService.clearBasket();
                $scope.basketItems = [];
                $rootScope.$emit('basketUpdate', 0);
              };

              $scope.exportBasket = function () {
                var text = '';
                angular.forEach($scope.basketItems, function(item){
                  text += item.id + '\t';
                  text += item.aspect + '\t';
                  text += item.name + '\n';
                });
                var blob = new Blob([text], {type: 'text/tsv;charset=utf-8;'});
                saveAs(blob, 'basket.tsv');
              };

              $scope.ok = function() {
                $modalInstance.close();
              };
            }
          });
        };
      }
    };
  }]);
