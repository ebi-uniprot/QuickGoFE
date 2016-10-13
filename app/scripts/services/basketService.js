'use strict';

var basketModule = angular.module('quickGoFeApp.BasketModule', []);

basketModule.factory('basketService', function($cookieStore, termService, $q, stringService, validationService) {

  var basketList = {};

  /*
   * Add an item to the basket
   */
  basketList.addBasketItem = function (basketItem) {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    //check the item isn't already isn't in the basket, and if it is don't add it.
    if(!this.containsGoTerm(basketItem)){
      items.push(basketItem);
      $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
      return items.length;
    }
  };


  /*
   * Refresh the basket completely
   */
  basketList.refreshBasket = function (newBasketList) {
    $cookieStore.put('uk.ac.ebi.quickgo.basket', newBasketList);
  };


  /*
   * Refresh the basket completely
   */
  basketList.clearBasket = function () {
    var emptyBasket = [];
    $cookieStore.put('uk.ac.ebi.quickgo.basket', emptyBasket);
  };


  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    items.splice(items.indexOf(basketItem), 1);
    $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
    return items.length;
  };


  /*
   * Count quantity in the basket
   */
  basketList.basketQuantity = function () {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    console.log("Items in Basket: ", items.length);
    return items.length;
  };


  /**
   * ------------------------------ Return items in Basket from cookie store -------------------------------
   *
   * @returns {*|Object|Array}
   */
  basketList.getItems = function(){
    var cookieItems = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    if(cookieItems.length>0){
      return termService.getGOTerms(cookieItems.toString());
    } else {
      var d = {
        data: {
          results: []
        }
      }
      return $q.resolve(d);
    }
  };

  basketList.getIds = function() {
    return $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
  }


  /**
   *
   * @param termId
   * @returns {boolean}
   */
  basketList.containsGoTerm = function (termId){
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    return items.indexOf(termId) > -1;
  };

  basketList.validateTerms = function(terms) {
    var ownTerms = stringService.getTextareaItemsAsArray(terms);
    var data = {};
    data.valid = _.filter( ownTerms, function(item){
      return validationService.validateGOTerm(item);
    });
    data.missmatches = _.difference(ownTerms, data.valid);

    return data;
  };


  return basketList;
});
