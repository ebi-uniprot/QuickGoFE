'use strict';

/* Filters Directive: Grab the correct url depending on input */
var filtersModule = angular.module('app.quickGo.filters', []).filter('withUrlFilter', function() {
  return function(input) {
    if (input === undefined) {
      return;
    }

    if (input.indexOf('InterPro') === 0) {
      var vals = input.split(':');
      return 'http://www.ebi.ac.uk/interpro/entry/' + vals[1];
    }

    if (input.indexOf('UniProtKB') === 0) {
      var values = input.split(':');
      return 'http://www.uniprot.org/keywords/' + values[1];
    }
  };
});

filtersModule.filter('shortenStringFilter', function () {
  return function (input) {
    if(input === undefined) {
      return;
    }

    if (input.length>30) {
      return input.substring(0,30)+'...';
    }

    return input;

  };
});
