/**
 * Created by twardell on 21/04/2015.
 */
app.controller('OntologyTermsCtrl', function($scope, $location, ontologies) {

  /*Parse the url to get the ontology letter (P,F,C)*/
  var pathVals =$location.path().split("/");
  var ontology=pathVals[(pathVals.length-1)];

  ontologies.query({ontology : ontology}, function(ontologyList){
    $scope.ontology = ontologyList;
  });

});
