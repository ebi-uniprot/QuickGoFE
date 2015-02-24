/**
 * Created by twardell on 24/02/2015.
 */

var wizardModule = angular.module('quickGoFeApp.WizardModule', []);

wizardModule.factory('wizardService', function() {

  var wizardService = {};
  var selectedGoTerms = [];

  wizardService.setSelectedTerms = function(terms){

    selectedGoTerms = terms;
  };


  wizardService.getSelectedTerms = function(){

    return selectedGoTerms;
  };

  return wizardService;
});
