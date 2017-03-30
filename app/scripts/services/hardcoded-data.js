'use strict';

var hardCodedModule = angular.module('quickGoFeApp.HardCodedDataModule', []);

hardCodedModule.factory('hardCodedDataService', function() {

  var hardCodedService = {};

  var qualifiers = [{
      name: 'enables',
      'qualifier': 'enables'
    },
    {
      name: 'NOT | enables',
      'qualifier': 'NOT|enables'
    },
    {
      name: 'involved_in',
      'qualifier': 'involved_in'
    },
    {
      name: 'NOT | involved_in',
      'qualifier': 'NOT|involved_in'
    },
    {
      name: 'part_of',
      'qualifier': 'part_of'
    },
    {
      name: 'NOT | part_of',
      'qualifier': 'NOT|part_of'
    },
    {
      name: 'contributes_to',
      'qualifier': 'contributes_to'
    },
    {
      name: 'NOT | contributes_to',
      'qualifier': 'NOT|contributes_to'
    },
    {
      name: 'colocalizes_with',
      'qualifier': 'colocalizes_with'
    },
    {
      name: 'NOT | colocalizes_with',
      'qualifier': 'NOT|colocalizes_with'
    }
  ];

  var downloadFileFormats = [{
      format: 'Gene Association File (GAF)',
      ext: 'gaf',
      strMimeType: 'text/gaf;charset=utf-8;'
    },
    {
      format: 'Gene Product Association Data (GPAD)',
      ext: 'gpad',
      strMimeType: 'text/gpad;charset=utf-8;'
    }/*,
    {
      format: 'Tab-delimited',
      ext: 'tsv',
      strMimeType: 'text/tsv;charset=utf-8;'
    },
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

  hardCodedService.getQualifiers = function() {
    return qualifiers;
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
