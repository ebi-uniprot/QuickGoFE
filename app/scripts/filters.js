/* Filters */

var filtersModule = angular.module('app.quickGo.filters',[])
    .filter('withUrlFilter', function () {
    return function (input) {
      if(input == undefined) return;

      if (input.indexOf("InterPro") == 0) {
        var vals = input.split(":");
        return "http://www.ebi.ac.uk/interpro/entry/" + vals[1];
      }
      if(input.indexOf("UniProtKB") == 0){
        var vals = input.split(":");
        return "http://www.uniprot.org/keywords/" + vals[1];
      }
    };
  });


