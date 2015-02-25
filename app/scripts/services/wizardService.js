/**
 * Created by twardell on 24/02/2015.
 */

var wizardModule = angular.module('quickGoFeApp.WizardModule', []);

wizardModule.factory('wizardService', function() {

  var wizardService = {};
  var selectedPredefinedTerms = [];
  var ownTerms = [];
  var selectedBasketTerms = [];
  var selectedPredefinedSlimSet;

  /**
   * Predefined Terms
   * @param terms
   */
  wizardService.setSelectedPredefinedTerms = function(terms){
    selectedPredefinedTerms = terms;
  };

  wizardService.getSelectedPredefinedTerms = function(){
    return selectedPredefinedTerms;
  };


  /**
   * Own Terms
   * @param terms
   */
  wizardService.setOwnTerms = function(terms){
       ownTerms = terms;
  };

  wizardService.getOwnTerms = function(){
    console.log("returning selected own terms", ownTerms);
    return ownTerms;
  };


  /**
   * Basket Terms
   * @param terms
   */
  wizardService.setSelectedBasketTerms = function(terms){
    selectedBasketTerms = terms;
  };


  wizardService.getSelectedBasketTerms = function(){
    return selectedBasketTerms;
  };


  /**
   * Predefined Slim Set
   * @param terms
   */
  wizardService.setSelectedPredefinedSlimSet = function(aSlimSet){
    selectedPredefinedSlimSet = aSlimSet;
  };


  wizardService.getSelectedPredefinedSlimSet = function(){
    return selectedPredefinedSlimSet;
  };


  /**
   * Return factory
   */
  return wizardService;
});
