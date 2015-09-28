
/**
 * Created by twardell on 07/04/2015.
 */
app.controller('AncestorChartCtrl', function($scope, $http, $modalInstance, feDomainAndPort, targetDomainAndPort, chartRequest) {
  console.log("IN THE ONTOLOGY GRAPH CONTROLLER");
  console.log("chartRequest ",chartRequest);
  $scope.isLoading = 1;
  //$scope.basketList = basketList;

  $scope.feDomainAndPort=feDomainAndPort;
  $scope.targetDomainAndPort=targetDomainAndPort;

  //var formattedURL=targetDomainAndPort+'/ws/chartfull?ids='+goModel.id;   //single version
  var formattedURL=targetDomainAndPort+'/ws/graphmulti?ids='+chartRequest.ids;
  var chartURL=targetDomainAndPort;

  console.log("Chart Full url", formattedURL);


  $http.get(formattedURL).success(function(data) {
    console.log("got the Chart Full response back ", data);
    $scope.isLoading=0;
    $scope.graphImage = data;


    //Now get the image data
    chartURL=targetDomainAndPort+'/'+$scope.graphImage.graphImageSrc;
    console.log("Getting the charturl ", chartURL);

    //$http.get({
    //  url: chartURL,
    //  method: 'GET',
    //  transformResponse: undefined
    //}).success(function(imgdata) {
    //  console.log("got the response back ", imgdata);
    //  $scope.imgdata = imgdata;
    //});

    $scope.imgdata = "data:image/png;base64, ";

    $http.get(chartURL,{
      method: 'GET',
      transformResponse: undefined
    }).success(function(imgdata) {
      console.log("got the response back ", imgdata);
      $scope.imgdata = $scope.imgdata+imgdata;
    });

    //$http.get(chartURL).success(function(imgdata) {
    //  console.log("got the response back ", imgdata);
    //  $scope.imgdata = imgdata;
    //});

  });

  /**
   * Create the text for the legend popover
   */

  //$scope.legendPopover = function(legendId){
  //  var content = element;
  //  if (legendId == 'is_a') {
  //    return "Term A <strong>is_a</strong> term B means that term A is a subtype of term B.<br/>For example, 'transcription' is a type of 'nucleic acid metabolic process'.";
  //  } else if (legendId == 'part_of') {
  //    return "Term A <strong>part_of</strong> term B means that term A is always a part of term B.<br/>For example, 'transcription' is always a part of 'gene expression'.";
  //  } else if (legendId == 'regulates') {
  //    return "Term A <strong>regulates</strong> term B means that term A regulates term B, but term B may not always be regulated by term A.";
  //  } else if (legendId == 'positively_regulates') {
  //    return "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>positively_regulates</strong> term B means that term B is positively regulated by term A.";
  //  } else if (legendId == 'negatively_regulates') {
  //    return "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>negatively_regulates</strong> term B means that term B is negatively regulated by term A.";
  //  } else if (legendId == 'has_part') {
  //    return "<strong>has_part</strong> means that term B always has as part of it term A, but term A may exist independently of term B.<br/>For example, 'protein binding trancription factor activity' always has as a part of it 'protein binding' but 'protein binding' may occur independently of transcription factor activity.<br/>Note that has_part is not a transitive relationship, meaning there is NO implication that gene products annotated to term A could also be correctly associated with term B or any of its parent terms.<br/>Has_part should be read in the opposite direction to the other relationships.";
  //  } else if (legendId == 'occurs_in') {
  //    return "This relation is used for inter-ontology links between the Biological Process ontology and the Cellular Component ontology, for example 'mitochondrial translation' occurs_in 'mitochondrion'.";
  //  } else if (legendId == 'used_in'){
  //    return "Documentation coming shortly...";
  //  }
  //}

  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

  /**
   * End
   */
});
