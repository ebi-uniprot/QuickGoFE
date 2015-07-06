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
    console.log("basket item is ", basketItem);

    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    //items[items.length] = basketItem;

    //check the item isn't already isn't in the basket, and if it is don't add it.
    if(!this.containsItem(basketItem)){
      console.log("current contents of basket",items);
      items.push(basketItem);
      $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
      return items.length;
    }else{
      console.log("item already exists in the basket");
    }


  }


  /*
   * Refresh the basket completely
   */
  basketList.refreshBasket = function (newBasketList) {
    //var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    //items[items.length] = basketItem;
    //console.log(items);
    //items.push(basketItem);
    $cookieStore.put('uk.ac.ebi.quickgo.basket', newBasketList);
  }



  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    console.log("BASKET SERVICE: removeBasketItem");

    console.log("Remove from cookie",basketItem);
    var basketLen = -1;

    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    console.log("items:: ", items);

    var i;
    for (i = 0, basketLen = items.length; i < basketLen; i++) {

      console.log("testing basket item ", i);

      if (items[i].termId == basketItem.termId) {
        items.splice(i, 1);
        basketLen--;
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


  /**
   *
   * @param searchGoId
   * @returns {boolean}
   */
  basketList.containsItem = function (searchGoId){
    console.log("does the basket contain? ", searchGoId);
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    console.log("size of cookie store is ", items.length);
    var basketLen = -1;
    var i;
    for (i = 0, basketLen = items.length; i < basketLen; i++) {
      console.log("Have found in the cookie store ", items[i]);
      if (searchGoId.termId == items[i].termId) {
        console.log("Found in cookie list")
        return true;
      }
    }
    console.log("Not found in cookie list")
    return false;
  }

  return basketList;
});
