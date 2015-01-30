/**
 * Created by twardell on 27/01/2015.
 */

var basketModule = angular.module('quickGoFeApp.BasketModule', []);

basketModule.factory('basketService', function($cookieStore) {

  var basketList = {};


  /*
   * Add an item to the basket
   */
  basketList.addBasketItem = function (basketItem) {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    items[items.length] = basketItem;
    console.log(items);
    //items.push(basketItem);
    $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
    return items.length;
  }

  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    console.log("Remove from cookie" + basketItem.goId);
    var basketLen = -1;
    var i;
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    for (i = 0, basketLen = items.length; i < basketLen; i++) {
      if (basketList[i].goId == basketItem.goId) {
        items.splice(i, 1);
      }
      $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
    }
    return items.length;
  }

  /*
   * Count quantity in the basket
   */
  basketList.basketQuantity = function () {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    return items.length;
  }

  basketList.getItems = function(){
    console.log("get items called");
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    return items;
  }


  return basketList;
});
