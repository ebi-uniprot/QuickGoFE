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

  var geneProductSets = [{
      name: 'BHF-UCL',
      value: 'BHF-UCL',
      link: 'http://www.ucl.ac.uk/cardiovasculargeneontology',
      description: 'The set of Cardiovascular-associated proteins being prioritised for annotation by the Cardiovascular Gene Ontology Annotation Initiative located at University College London.'
    },
    {
      name: 'Exosome',
      value: 'Exosome',
      link: 'http://www.ebi.ac.uk/GOA/exosome',
      description: 'The set of exosomal human proteins being prioritised for comprehensive annotation by the UniProt curators at the EBI.'
    },
    {
      name: 'KRUK',
      value: 'KRUK',
      link: 'http://www.ebi.ac.uk/GOA/kidney',
      description: 'The set of proteins associated with renal processes being prioritised for annotation by the EBI\'s Renal Gene Ontology Annotation Initiative'
    },
    {
      name: 'ParkinsonsUK-UCL',
      value: 'ParkinsonsUK-UCL',
      link: 'http://www.ucl.ac.uk/functional-gene-annotation/neurological',
      description: 'The set of Parkinson\'s Disease relevant proteins being prioritised for annotation by the Parkinson\'s Disease Gene Ontology Annotation Initiative located at University College London.'
    },
    {
      name: 'Reference Genome',
      value: 'ReferenceGenome',
      link: 'http://www.geneontology.org/GO.refgenome.shtml',
      description: 'The set of human proteins being comprehensively curated by the UniProt-GOA project as part of the GO Consortium\'s Reference Genome initiative.'
    }
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

  hardCodedService.getGeneProductSets = function() {
    return geneProductSets;
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
