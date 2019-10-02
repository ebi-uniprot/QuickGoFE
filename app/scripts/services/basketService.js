'use strict';

var basketModule = angular.module('quickGoFeApp.BasketModule', []);

basketModule.factory('basketService', function($cookies, termService, $q) {
  var basketList = {};
  var cookieName = 'uk.ac.ebi.quickgo.basket';

  basketList.getCookies = function() {
    var cookieValue = $cookies.get(cookieName) || [];

    // NOTE: remove the following try-catch block after a few days
    // of production. This is only to deal with older cookie values.
    // If cookie value is a JSON object, convert it to the newer string format.
    try {
      cookieValue = JSON.parse(cookieValue);
      cookieValue = Object.keys(cookieValue)
        .map(function(k) { return k.substring(3) })
        .join(',');

      $cookies.put(cookieName, cookieValue);
    } catch(e) {
      // do nothing...
    }

    return (cookieValue.length > 0)
      ? cookieValue
          .split(',')
          .map(function (item) { return 'GO:' + item; })
      : [];
  }

  basketList.saveCookies = function(items) {
    var cookieValue = items.join(',');
    $cookies.put(cookieName, cookieValue);
  }

  /*
   * Add an item to the basket
   */
  basketList.addBasketItem = function (basketItem) {
    var items = basketList.getCookies()
      .map(function (item) {
        return item.substr(3);
      });
    items.push(basketItem.substr(3));
    basketList.saveCookies(items);
  };

  /*
   * Refresh the basket completely
   */
  basketList.clearBasket = function () {
    basketList.saveCookies('');
  };


  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    var items = basketList.getCookies();
    var index = items.indexOf(basketItem);

    if (index > -1) {
      items.splice(index, 1);
    }

    basketList.saveCookies(items.map(function(i) { return i.substr(3); }));
  };


  /*
   * Count quantity in the basket
   */
  basketList.basketQuantity = function () {
    var items = basketList.getCookies();
    return items.length;
  };


  /**
   * ------------------------------ Return items in Basket from cookie store -------------------------------
   *
   * @returns {*|Object|Array}
   */
  basketList.getItems = function(){
    var items = basketList.getCookies();
    if(items.length > 0) {
      return termService.getGOTerms(items.join(','));
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
    return basketList.getCookies();
  };

  basketList.containsGoTerm = function(termId) {
    var items = basketList.getCookies();
    return (items.indexOf(termId) > -1) ;
  }

  return basketList;
});
