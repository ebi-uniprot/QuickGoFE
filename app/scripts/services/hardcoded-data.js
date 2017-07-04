'use strict';

var hardCodedModule = angular.module('quickGoFeApp.HardCodedDataModule', []);

hardCodedModule.factory('hardCodedDataService', function() {

  var hardCodedService = {};

  var downloadFileFormats = [{
      format: 'Gene Association File (GAF)',
      ext: 'gaf',
      strMimeType: 'text/gaf;charset=utf-8;'
    },
    {
      format: 'Gene Product Association Data (GPAD)',
      ext: 'gpad',
      strMimeType: 'text/gpad;charset=utf-8;'
    },
    {
      format: 'Tab-delimited (TSV)',
      ext: 'tsv',
      strMimeType: 'text/tsv;charset=utf-8;'
    }/*,
    {
      format: 'Gene2GO',
      ext: 'gene2go',
      strMimeType: 'text/plain;charset=utf-8;'
    }*/
  ];

  var serviceLimits = {
      taxonId: 50,
      geneProductId: 500,
      goId: 600,
      eco: 100,
      reference: 50
  };

  hardCodedService.getDownloadFileFormats = function() {
    return downloadFileFormats;
  };

  hardCodedService.getServiceLimits = function() {
    return serviceLimits;
  };

  hardCodedService.getTermsLimitMsg = function(limit) {
    return {
      type: 'alert',
      msg: 'Sorry, maximum ' + limit + ' terms allowed. Please revise your term selection and try again.'};
  };

  return hardCodedService;
});
