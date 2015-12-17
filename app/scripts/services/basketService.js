/**
 * Created by twardell on 27/01/2015.
 */

var basketModule = angular.module('quickGoFeApp.BasketModule', []);

basketModule.factory('basketService', function($cookieStore, termService, $q) {

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
  }


  /*
   * Refresh the basket completely
   */
  basketList.refreshBasket = function (newBasketList) {
    $cookieStore.put('uk.ac.ebi.quickgo.basket', newBasketList);
  }


  /*
   * Refresh the basket completely
   */
  basketList.clearBasket = function () {
    var emptyBasket = [];
    $cookieStore.put('uk.ac.ebi.quickgo.basket', emptyBasket);
  }


  /**
   * Remove an item from the basket
   * @param basketItem
   */
  basketList.removeBasketItem = function (basketItem) {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    items.splice(items.indexOf(basketItem), 1);
    $cookieStore.put('uk.ac.ebi.quickgo.basket', items);
    return items.length;
  }


  /*
   * Count quantity in the basket
   */
  basketList.basketQuantity = function () {
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    return items.length;
  }


  /**
   * ------------------------------ Return items in Basket from cookie store -------------------------------
   *
   * @returns {*|Object|Array}
   */
  basketList.getItems = function(){
    var cookieItems = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    return termService.getTerms(cookieItems.toString());
  }


  /**
   *
   * @param termId
   * @returns {boolean}
   */
  basketList.containsGoTerm = function (termId){
    var items = $cookieStore.get('uk.ac.ebi.quickgo.basket') || []  ;
    return items.indexOf(termId) > -1;
  }

  basketList.validateTerms = function(terms) {
    var defer = $q.defer();

    var ownTerms = _.uniq(terms.replace( /\n/g, " " ).split(/[\s,]+/));

    termService
      .getTerms(ownTerms.toString())
      .then(function(res) {
          var data = {};
          data.valid = _.filter(res.data, function(item) {
            return item; //filter out null values
          });
          data.missmatches = _.difference(ownTerms, _.pluck(res.data, 'termId'));
          defer.resolve(data);
      });
    return defer.promise;
  }


  return basketList;
});
