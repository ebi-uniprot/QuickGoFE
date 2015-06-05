/**
 * Created by twardell on 04/06/2015.
 */
app.controller('SearchResultCtrl', function($scope,  $location, searchfull) {


  //This value holds the displayed total for the selected view by value
  $scope.srcTotalNumberResults = 0;

  console.log("Arrived is search results");
  $scope.isLoading = 1;
  $scope.resultsPerPage=25;
  $scope.currentPage=1;
  $scope.viewBy = "entity";

  //Parse the content of the url to use as the search expr
  var pathVals =$location.path().split("/");
  $scope.searchTerm=pathVals[(pathVals.length-1)];


  getResultsPage(1);    //<--this is called instead by the page changed call

  $scope.pagination = {
    current: 1
  };

  function getResultsPage(pageNumber) {

    $scope.isLoading = 1;


    console.log("doing a search with a view by value of ", $scope.viewBy);


    //Now do search for this


    searchfull.query({text: $scope.searchTerm, page: pageNumber, rows: $scope.resultsPerPage, viewBy: $scope.viewBy}, function (result) {
      $scope.matches = [];


      console.log("found suggested values data ", result);
      $scope.x = result;
      console.log("Populated matches", $scope.searchResults);

      $scope.isLoading = 0;
      $scope.currentPage = pageNumber;

      //Populate the displayed number of search results
      if($scope.x.viewBy=='entity') {
        $scope.srcTotalNumberResults = $scope.x.gpNumberResults;
      }

      if($scope.x.viewBy=='goID') {
        $scope.srcTotalNumberResults = $scope.x.goNumberResults;
      }

      if($scope.x.viewBy=='bp') {
        $scope.srcTotalNumberResults = $scope.x.biologicalProcessNumberOfResults;
      }

      if($scope.x.viewBy=='mf') {
        $scope.srcTotalNumberResults = $scope.x.molecularFunctionNumberOfResults;
      }

      if($scope.x.viewBy=='cc') {
        $scope.srcTotalNumberResults = $scope.x.cellularComponentsNumberOfResults;
      }

    });
  }



  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function(newPage) {
    console.log("Page changed", newPage);
    if($scope.currentPage!=newPage) {
      getResultsPage(newPage);
    }
  };



  $scope.showResults= function(viewBy) {
    console.log("View By changed", viewBy);
    if($scope.viewBy!=viewBy) {
      $scope.viewBy=viewBy
      getResultsPage(1);
    }
  };


  $scope.highlight = function(text){

    if(!text){
      return text;
    }

  var newText =  text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
      //console.log("highlight ", newText);
    return newText;
  }

  //Now do search for this - old code
  //search.query({query : searchTerm}, function(result){
  //  $scope.matches=[];
  //
  //  console.log("found suggested values data ", result);
  //  console.log("new value ", searchTerm);
  //
  //  //Make the search value lower case so it matches target
  //  var newValueLc=searchTerm.toLowerCase();
  //
  //
  //  for(var k=0; k<result.go.length; k++){
  //
  //    console.log("content of go", result.go[k]);
  //    console.log("length of return", result.go.length)
  //
  //    var aMatch = {};
  //    aMatch.id = result.go[k].id;
  //
  //    //if comment exists look for search value
  //    if(result.go[k].comment != undefined) {
  //      console.log("content of comment", result.go[k].comment);
  //
  //      //save the comment to an all lowercase
  //      var target = result.go[k].comment.toLowerCase();
  //
  //      var loc = target.indexOf(newValueLc);
  //      if (loc > -1) {
  //        aMatch.match = result.go[k].comment.substring(loc - 10, loc + 10);
  //        aMatch.text = result.go[k].comment;
  //        $scope.matches[k] = aMatch;
  //      }
  //    }
  //
  //    if(result.go[k].definition != undefined) {
  //      console.log("content of definition", result.go[k].definition);
  //
  //      //save the comment to an all lowercase
  //      var target = result.go[k].definition.toLowerCase();
  //
  //      var loc = target.indexOf(newValueLc);
  //      console.log("Definition loc=", loc);
  //      if (loc > -1) {
  //        aMatch.match = result.go[k].definition.substring(loc - 10, loc + 10);
  //        aMatch.text = result.go[k].definition;
  //        $scope.matches[k] = aMatch;
  //      }
  //    }
  //  }
  //
  //  console.log("Populated matches", $scope.matches);
  //
  //});


});
