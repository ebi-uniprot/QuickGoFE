/**
 * Created by twardell on 27/01/2015.
 */

var hardCodedModule = angular.module('quickGoFeApp.HardCodedDataModule', []);

hardCodedModule.factory('hardCodedDataService', function() {

  var hardCodedService = {};

  var annotationColumns = [
    {'name': 'colDatabase', 'value':'Database', 'slimCol':false},
    {'name': 'colGeneProductID', 'value': 'Gene Product ID', 'slimCol':false},
    {'name': 'colSymbol', 'value': 'Symbol', 'slimCol':false},
    {'name': 'colQualifier', 'value': 'Qualifier', 'slimCol':false},
    {'name': 'colGOIdentifier', 'value': 'GO Identifier', 'slimCol':false},
    {'name': 'colGOTermName', 'value': 'GO Term Name', 'slimCol':false},
    {'name': 'colOrigID', 'value': 'Original GO Identifier', 'slimCol':true},
    {'name': 'colOrigName', 'value': 'Original GO Term Name', 'slimCol':true},
    {'name': 'colAspect', 'value': 'Aspect', 'slimCol':false},
    {'name': 'colEvidence', 'value': 'Evidence', 'slimCol':false},
    {'name': 'colReference', 'value': 'Reference', 'slimCol':false},
    {'name': 'colWith', 'value': 'With', 'slimCol':false},
    {'name': 'colTaxon', 'value': 'Taxon', 'slimCol':false},
    {'name': 'colAssignedBy', 'value': 'Assigned By', 'slimCol':false},
    {'name': 'colAnnotationExtension', 'value': 'Annotation Extension', 'slimCol':false}
  ];

  var initialTaxonomies = [
    {'taxId': '9606', 'title': 'Homo sapiens'},
    {'taxId': '10090', 'title': 'Mus musculus'},
    {'taxId': '10116', 'title': 'Rattus norvegicus'},
    {'taxId': '3702', 'title': 'Arabidopsis thaliana'}
  ];

  var mostCommonTaxonomies = [
    {'taxId': '9606', 'title': 'Homo sapiens'},
    {'taxId': '10090', 'title': 'Mus musculus'},
    {'taxId': '10116', 'title': 'Rattus norvegicus'},
    {'taxId': '3702', 'title': 'Arabidopsis thaliana'},
    {'taxId': '559292', 'title': 'Saccharomyces cerevisiae (strain ATCC 204508 / S288c)'},
    {'taxId': '284812', 'title': 'Schizosaccharomyces pombe (strain 972 / ATCC 24843)'},
    {'taxId': '83333', 'title': 'Escherichia coli (strain K12)'},
    {'taxId': '6239', 'title': 'Caenorhabditis elegans'},
    {'taxId': '7955', 'title': 'Danio rerio'},
    {'taxId': '44689', 'title': 'Dictyostelium discoideum'},
    {'taxId': '7227', 'title': 'Drosophila melanogaster'},
    {'taxId': '9031', 'title': 'Gallus gallus'},
    {'taxId': '9913', 'title': 'Bos taurus'}
  ];

  //The following data is also available via the web service.
  var preDefinedSlimSets = [
    {'name':'goslim_candida', 'slimId': 89},
    {'name':'goslim_plant', 'slimId': 100},
    {'name':'goslim_generic', 'slimId': 149},
    {'name':'goslim_pir', 'slimId': 462},
    {'name':'goslim_virus', 'slimId':30},
    {'name':'goslim_yeast', 'slimId': 169},
    {'name':'goslim_pombe', 'slimId': 48},
    {'name':'goslim_aspergillus', 'slimId': 85},
    {'name':'goslim_metagenomics', 'slimId': 119}
  ];


  var qualifiers = [
    {name:'enables','qualifier':'ENABLES'},
    {name:'NOT | enables','qualifier':'NOT|enables'},
    {name:'involved_in','qualifier':'involved_in'},
    {name:'NOT | involved_in','qualifier':'NOT|involved_in'},
    {name:'part_of','qualifier':'part_of'},
    {name:'NOT | part_of','qualifier':'NOT|part_of'},
    {name:'contributes_to','qualifier':'contributes_to'},
    {name:'NOT | contributes_to','qualifier':'NOT|contributes_to'},
    {name:'colocalizes_with','qualifier':'colocalizes_with'},
    {name:'NOT | colocalizes_with','qualifier':'NOT|colocalizes_with'}
  ];


  var references = [
    {refId:"DOI*", display:"DOI*", name:"Digital Object Identifier"},
    {refId:"GO_REF*", display:"GO_REF*", name:"Gene Ontology Database references"},
    {refId:"PMID*", display:"PMID*", name:"PubMed"},
    {refId:"Reactome*", display: "Reactome", name:"Reactome - a curated knowledgebase of biological pathways"},
    {refId:"GO_REF:0000037", display:"GO_REF:0000037", name:"UniProt Keywords2GO (UniProtKB/Swiss-Prot entries)"},
    {refId:"GO_REF:0000038", display:"GO_REF:0000038", name:"UniProt Keywords2GO (UniProtKB/TrEMBL entries)"},
    {refId:"GO_REF:0000039", display:"GO_REF:0000039", name:"UniProt Subcellular Location2GO (UniProtKB/Swiss-Prot entries)"},
    {refId:"GO_REF:0000040", display:"GO_REF:0000040", name:"UniProt Subcellular Location2GO (UniProtKB/TrEMBL entries)"},
    {refId:"GO_REF:0000045", display:"GO_REF:0000045", name:"UniProt Keywords2GO (UniProtKB/TrEMBL entries, conservatively modified by UniProt)"},
    {refId:"GO_REF:0000002", display:"GO_REF:0000002", name:"InterPro2GO"},
    {refId:"GO_REF:0000042", display:"GO_REF:0000042", name:"InterPro2GO (conservatively modified by UniProt)"},
    {refId:"GO_REF:0000035", display:"GO_REF:0000035", name:"EnsemblPlants/Gramene"},
    {refId:"GO_REF:0000019", display:"GO_REF:0000019", name:"Ensembl Compara"},
    {refId:"GO_REF:0000003", display:"GO_REF:0000003", name:"EC2GO"},
    {refId:"GO_REF:0000020", display:"GO_REF:0000020", name:"HAMAP2GO"},
    {refId:"GO_REF:0000041", display:"GO_REF:0000041", name:"UniPathway2GO"},
    {refId:"GO_REF:0000049", display:"GO_REF:0000049", name:"EnsemblFungi"},
    {refId:"GO_REF:0000104", display:"GO_REF:0000104", name:"UniRule2GO"}
  ];


   var downloadFileFormats= [
      {format:"Gene Association File (GAF)", ext:"gaf" },
      {format:"Gene Product Association Data (GPAD)", ext:"gpad" },
      {format:"Tab-delimited", ext:"tsv" },
      {format:"Gene2GO", ext:"gene2go" }
    ];

    var geneProductSets = [
      {name: 'BHF-UCL', value: 'BHF-UCL', link:'http://www.ucl.ac.uk/cardiovasculargeneontology', description:'The set of Cardiovascular-associated proteins being prioritised for annotation by the Cardiovascular Gene Ontology Annotation Initiative located at University College London.'},
      {name: 'Exosome', value: 'Exosome', link:'http://www.ebi.ac.uk/GOA/exosome', description:'The set of exosomal human proteins being prioritised for comprehensive annotation by the UniProt curators at the EBI.'},
      {name: 'KRUK', value: 'KRUK', link:'http://www.ebi.ac.uk/GOA/kidney', description:'The set of proteins associated with renal processes being prioritised for annotation by the EBI\'s Renal Gene Ontology Annotation Initiative'},
      {name: 'ParkinsonsUK-UCL', value: 'ParkinsonsUK-UCL', link:'http://www.ucl.ac.uk/functional-gene-annotation/neurological', description:'The set of Parkinson\'s Disease relevant proteins being prioritised for annotation by the Parkinson\'s Disease Gene Ontology Annotation Initiative located at University College London.'},
      {name: 'Reference Genome', value: 'Reference Genome', link:'http://www.geneontology.org/GO.refgenome.shtml', description:'The set of human proteins being comprehensively curated by the UniProt-GOA project as part of the GO Consortium\'s Reference Genome initiative.'}
    ]


  /**
   *
   *  ~~~~~~ Return Methods ~~~~~~
   */

  hardCodedService.getAnnotationColumns = function() {
    return annotationColumns;
  }

  hardCodedService.getInitialTaxonomies = function() {
    return initialTaxonomies;
  }

  hardCodedService.getMostCommonTaxonomies = function() {
    return mostCommonTaxonomies;
  }

  hardCodedService.getQualifiers = function(){
    return qualifiers;
  }

  hardCodedService.getDownloadFileFormats = function(){
    return downloadFileFormats;
  }

  hardCodedService.getGeneProductSets = function(){
    return geneProductSets;
  }


  /**
   *   ~~~~~~ Testing ~~~~~~
   */

  /**
   * bio
   * @type {{goId: string, goName: string}[]}
   */
  var goslimCandidaBiologicalProcessTerms = [
    {'goId':'GO:0006629', 'goName':'lipid metabolic process'},
    {'goId':'GO:0030448', 'goName':'hyphal growth'}
  ];

  var goslimPlantBiologicalProcessTerms = [
    {'goId':'GO:0015979', 'goName':'photosynthesis'},
    {'goId':'GO:0008219', 'goName':'cell death'}
  ];

  /**
   * mol
   * @type {{goId: string, goName: string}[]}
   */
  var goslimCandidaBiologicalProcessTerms = [
    {'goId':'GO:0006629', 'goName':'lipid metabolic process'},
    {'goId':'GO:0030448', 'goName':'hyphal growth'}
  ];

  var goslimPlantBiologicalProcessTerms = [
    {'goId':'GO:0015979', 'goName':'photosynthesis'},
    {'goId':'GO:0008219', 'goName':'cell death'}
  ];

  /**
   * component
   */


  /**
   * Function for testing only
   * @returns {{name: string}[]}
   */
  hardCodedService.getPreDefinedSlimSets = function(){
    return preDefinedSlimSets;
  }


  /**
   * Function for testing only - bioProcessTerms
   * @param selectedSlimSet
   * @returns {{goId: string, goName: string}[]}
   */
  hardCodedService.getBioProcessTerms = function(selectedSlimSet){

    if(selectedSlimSet =='goslim_candida' ){
      return goslimCandidaBiologicalProcessTerms;
    }
    return goslimPlantBiologicalProcessTerms;
  }


  /**
   * Function for testing only - bioProcessTerms
   * @param selectedSlimSet
   * @returns {{goId: string, goName: string}[]}
   */
  hardCodedService.getmolFunctionTerms = function(selectedSlimSet){

    if(selectedSlimSet =='goslim_candida' ){
      return goslimCandidaBiologicalProcessTerms;
    }
    return goslimPlantBiologicalProcessTerms;
  }

  /**
   * Get all the filter references
   * @returns {{refId: string, name: string}[]}
   */
  hardCodedService.getFilterReferences = function(){
    return references;
  }

  return hardCodedService;
});
