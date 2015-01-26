/**
 * Created by twardell on 17/12/2014.
 */

var services = angular.module('quickGoFeApp.services', ['ngResource']);

//services.factory('basket', function() {
//  var items = [];
//  var myBasketService = {};
//
//  myBasketService.addItem = function(item) {
//    items.push(item);
//  };
//  myBasketService.removeItem = function(item) {
//    var index = items.indexOf(item);
//    items.splice(index, 1);
//  };
//  myBasketService.items = function() {
//    return items;
//  };
//
//  return myBasketService;
//});


// http://wwwdev.ebi.ac.uk/QuickGO/ws/lookup?scope=go&id=GO:0006915

//services.factory('AnnotationListLoader', ['$resource',
//    function($resource) {
//        return $resource('http://wwwdev.ebi.ac.uk/QuickGO/ws/lookup/:id', {id: '@id'}, {
//                query: {method:'GET', params:{id:'go'}, isArray:true}
//            }
//        );
//    }]);

//phonecatServices.factory('Phone', ['$resource',
//    function($resource){
//        return $resource('phones/:phoneId.json', {}, {
//            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//        });
//    }]);
