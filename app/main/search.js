/**
 * Created by twardell on 29/05/2015.
 */

app.controller('SearchCtrl', function($scope, $location, search) {

  $scope.searchText='';


  //$scope.$watch('searchText', provideSuggestions);

  //function provideSuggestions(newValue, oldValue, scope){
    function provideSuggestions(newValue){
    console.log("provide suggestions called", newValue);
    //$scope.foundMatches = newValue+'randomStuff';

    //var resultSearch = search.query();
    //resultSearch.$promise.then(function(data){
    //  $scope.foundMatchess = data;
    //});

    search.query({query : newValue}, function(result){
      $scope.matches=[];

      console.log("found suggested values data ", result);
      console.log("new value ", newValue);

      //Make the search value lower case so it matches target
      var newValueLc=newValue.toLowerCase();

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
            $scope.matches[k] = aMatch;
          }
        }



      }

      console.log("Populated matches", $scope.matches);

    });

  }


  /**
   * Process the search request and go to the search page
   */

  $scope.showSearchResults = function (searchTerm) {

    console.log("forwarding to search results");
    $location.path("/search/"+searchTerm);

  }

  //$scope.search = function() {
  //  var map = {};
  //  var text = $("#query").val();
  //  if (text.indexOf("GO:") == 0) {
  //    window.location.href = contextPath + "/term/" + text.substring(0, 11);
  //  } else if (text.indexOf("ECO:") == 0) {
  //    window.location.href = contextPath + "/term/" + text.substring(0, 12);
  //  } else if (isUniprotAccession(text)){//protein
  //    map["dbObjectId"] = text;
  //    searchCall(map, true);
  //  }else{ //text
  //    map["text"] = text;
  //    window.location = contextPath + "/search?query=" + JSON.stringify(map) + "&isProtein=false";
  //    $('#searched_text').html($(response).find('#searched_text'));
  //    $('#searchResultsArea').html($(response).find('#searchResultsArea'));
  //    $("#light-search-pagination").pagination('updateItems', $('input[name=total_number_results]').val());
  //    $("#light-search-pagination").pagination('selectPage', 1);
  //    $('#searchPageCount').html($(response).find('#searchPageCount'));
  //  }
  //}



});
