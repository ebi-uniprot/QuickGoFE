/**
 * Created by twardell on 27/01/2015.
 */

var hardCodedModule = angular.module('quickGoFeApp.HardCodedDataModule', []);

hardCodedModule.factory('hardCodedDataService', function() {

  var hardCodedService = {};

  var annotationColumns = [
    {'name': 'colGeneProductID', 'value': 'Gene Product ID'},
    {'name': 'colSymbol', 'value': 'Symbol'},
    {'name': 'colQualifier', 'value': 'Qualifier'},
    {'name': 'colGOIdentifier', 'value': 'GO Identifier'},
    {'name': 'colGOTermName', 'value': 'GO Term Name'},
    {'name': 'colAspect', 'value': 'Aspect'},
    {'name': 'colEvidence', 'value': 'Evidence'},
    {'name': 'colReference', 'value': 'Reference'},
    {'name': 'colWith', 'value': 'With'},
    {'name': 'colTaxon', 'value': 'Taxon'},
    {'name': 'colAssignedBy', 'value': 'Assigned By'},
    {'name': 'colAnnotationExtension', 'value': 'Annotation Extension'}
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

  var preDefinedSlimSets = [
    {'name':'goslim_candida'},
    {'name':'goslim_plant'}
  ];

  hardCodedService.getAnnotationColumns = function() {
    return annotationColumns;
  }

  hardCodedService.getMostCommonTaxonomies = function() {
    return mostCommonTaxonomies;
  }


  /**
   *   ~~~~~~ Testing ~~~~~~
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
   * Function for testing only
   * @returns {{name: string}[]}
   */
  hardCodedService.getPreDefinedSlimSets = function(){
    return preDefinedSlimSets;
  }


  /**
   * Function for testing only
   * @param selectedSlimSet
   * @returns {{goId: string, goName: string}[]}
   */
  hardCodedService.getBioProcessTerms = function(selectedSlimSet){

    if(selectedSlimSet =='goslim_candida' ){
      return goslimCandidaBiologicalProcessTerms;
    }
    return goslimPlantBiologicalProcessTerms;
  }

  return hardCodedService;
});
