/* Filters Directive: Grab the correct url depending on input */

var filtersModule = angular.module('app.quickGo.filters',[]).filter('withUrlFilter', function () {
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


filtersModule.filter('referenceUrlFilter', function () {
    return function (input) {
      if(input == undefined) return;


      if (input.lastIndexOf("GO_REF",0) == 0) {
        var vals = input.split(":");
        return "http://www.geneontology.org/cgi-bin/references.cgi#" + vals[1];
      }

      if (input.lastIndexOf("PMID",0) == 0) {
        var vals = input.split(":");
        return "http://europepmc.org/abstract/MED/" + vals[1];
      }

      if (input.lastIndexOf("DOI",0) == 0) {
        return "http://dx.doi.org/" + input;
      }
    };
  });


filtersModule.filter('shortenStringFilter', function () {
  return function (input) {
    if(input == undefined) return;


    if (input.length>30) {
      return input.substring(0,30)+"...";
    }

    return input;

  };
});
