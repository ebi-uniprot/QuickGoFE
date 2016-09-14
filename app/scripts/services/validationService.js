'use strict';

var validationModule = angular.module('quickGoFeApp.ValidationModule', []);

validationModule.factory('validationService', function() {
  var validationService = {};

  validationService.validateGOTerm = function(term) {
    return term.match(/^GO:\d{7}$/);
  };

  validationService.validateECOTerm = function(ev) {
    return ev.match(/^ECO:\d{7}$/);
  };

  validationService.validateGeneProduct = function(id) {
    var matches = (id.match(/^([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z]([0-9][A-Z][A-Z0-9]{2}){1,2}[0-9])((-[0-9]+)|:PRO_[0-9]{10}|:VAR_[0-9]{6}){0,1}$/) || id.match(/^EBI-[0-9]+$/) || id.match(/^URS[0-9A-F]{10}(_[0-9]+){0,1}$/));
    return matches;
  };

  validationService.validateTaxon = function(taxon){
    return taxon.match(/^[0-9]+$/);
  };

  validationService.validateOther = function(other){
    return other.match(/[A-Za-z0-9]+/);
  };

  return validationService;
});
