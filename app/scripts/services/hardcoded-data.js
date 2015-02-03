/**
 * Created by twardell on 27/01/2015.
 */

var hardCodedModule = angular.module('quickGoFeApp.HardCodedDataModule', []);

hardCodedModule.factory('hardCodedDataService', function() {

  var hardCodedService = {};


  hardCodedService.getAnnotationColumns = function() {
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
    {'name': 'colAnnotationExtension', 'value': 'Annotation Extension'}];
    return annotationColumns;
  }

  hardCodedService.getMostCommonTaxonomies = function() {
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
      {'taxId': '9913', 'title': 'Bos taurus'}]
    return mostCommonTaxonomies;
  }

  return hardCodedService;
});
