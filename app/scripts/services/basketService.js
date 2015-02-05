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
    //items[items.length] = basketItem;
    console.log(items);
    items.push(basketItem);
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
    console.log("items:: ", items);
    for (i = 0, basketLen = items.length; i < basketLen; i++) {
      if (items[i].goId == basketItem.goId) {
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


  basketList.containsItem = function (searchGoId){
    console.log("contains items called ", searchGoId);
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    console.log("size of cookie store is ", items.length);
    var basketLen = -1;
    var i;
    for (i = 0, basketLen = items.length; i < basketLen; i++) {
      console.log("Have found in the cookie store ", items[i]);
      if (searchGoId == items[i].goId) {
        console.log("Found in cookie list")
        return true;
      }
    }
    console.log("Not found in cookie list")
    return false;
  }

  return basketList;
});
