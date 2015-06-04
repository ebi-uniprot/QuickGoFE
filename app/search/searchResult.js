/**
 * Created by twardell on 04/06/2015.
 */
app.controller('SearchResultCtrl', function($scope,  $location, search) {

  console.log("Arrived is search results");
  $scope.isLoading = 0;

  //Parse the content of the url to use as the search expr
  var pathVals =$location.path().split("/");
  var searchTerm=pathVals[(pathVals.length-1)];



  //Now do search for this
  //search.query({query : searchTerm}, function(result){
  //  $scope.matches=[];

  searchfull.query({text : searchTerm}, function(result){
    $scope.matches=[];

    console.log("found suggested values data ", result);
    console.log("new value ", searchTerm);

    //Make the search value lower case so it matches target
    var newValueLc=searchTerm.toLowerCase();

    //$scope.foundMatches=[];

    for(var k=0; k<result.go.length; k++){

      console.log("content of go", result.go[k]);
      console.log("length of return", result.go.length)

      var aMatch = {};
      aMatch.id = result.go[k].id;

      //if comment exists look for search value
      if(result.go[k].comment != undefined) {
        console.log("content of comment", result.go[k].comment);

        //save the comment to an all lowercase
        var target = result.go[k].comment.toLowerCase();

        var loc = target.indexOf(newValueLc);
        if (loc > -1) {
          aMatch.match = result.go[k].comment.substring(loc - 10, loc + 10);
          aMatch.text = result.go[k].comment;
          $scope.matches[k] = aMatch;
        }
      }

      if(result.go[k].definition != undefined) {
        console.log("content of definition", result.go[k].definition);

        //save the comment to an all lowercase
        var target = result.go[k].definition.toLowerCase();

        var loc = target.indexOf(newValueLc);
        console.log("Definition loc=", loc);
        if (loc > -1) {
          aMatch.match = result.go[k].definition.substring(loc - 10, loc + 10);
          aMatch.text = result.go[k].definition;
          $scope.matches[k] = aMatch;
        }
      }



    }

    console.log("Populated matches", $scope.matches);

  });


});
