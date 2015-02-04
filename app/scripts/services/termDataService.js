/**
 * Created by twardell on 27/01/2015.
 */

var termDataModule = angular.module('quickGoFeApp.TermDataModule', []);

termDataModule.factory('termDataService', function($http) {

  var formattedURL='http://localhost:9080/ws/term/';
  //var termModel = {"termId":"GO:0003824","name":"catalytic activity"};

  var termDataService = {};


  //termDataService.getTerm = function(termId) {
  //
  //  var termModel;
  //
  //  $http.get(formattedURL+termId).success(function(data) {
  //    console.log("got the term response back ", data);
  //    termModel = data;
  //    console.log(termModel);
  //    return termModel;
  //  })
  //
  //  return termModel;
  //}

  return termDataService;

  //return {
  //  get: function(termId){
  //    return $http.get(formattedURL + termId);
  //  }
  //}
});
