'use strict';

var basketModule = angular.module('quickGoFeApp.BasketModule', []);

basketModule.factory('basketService', function($cookies, termService, $q) {
  var basketList = {};
  var cookieName = 'uk.ac.ebi.quickgo.basket';


  basketList.getCookies = function() {
    return $cookies.getObject(cookieName) || {};
  }

  basketList.saveCookies = function(items) {
    $cookies.putObject(cookieName, items);
  }

  /*
   * Add an item to the basket
   */
  basketList.addBasketItem = function (basketItem) {
    var items = basketList.getCookies();
    items[basketItem] = basketItem;
    basketList.saveCookies(items);
  };

  /*
   * Refresh the basket completely
   */
  basketList.clearBasket = function () {
    basketList.saveCookies({});
  };


  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    var items = basketList.getCookies();
    delete items[basketItem];
    basketList.saveCookies(items);
  };


  /*
   * Count quantity in the basket
   */
  basketList.basketQuantity = function () {
    var items = basketList.getCookies();
    return Object.keys(items).length;
  };


  /**
   * ------------------------------ Return items in Basket from cookie store -------------------------------
   *
   * @returns {*|Object|Array}
   */
  basketList.getItems = function(){
    var items = basketList.getCookies();
    if(Object.keys(items).length > 0) {
      return termService.getGOTerms(Object.keys(items).join(','));
    } else {
      var d = {
        data: {
          results: []
        }
      };
      return $q.resolve(d);
    }
  };

  basketList.getIds = function() {
    return Object.keys(basketList.getCookies());
  };

  basketList.containsGoTerm = function(termId) {
    return basketList.getCookies()[termId] ? true : false;
  }

  return basketList;
});
