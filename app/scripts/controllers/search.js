/**
 * Created by twardell on 29/05/2015.
 */

app.controller('SearchCtrl', function($scope) {

  $scope.searchText='';
  $scope.foundMatches='';

  $scope.$watch('searchText', provideSuggestions);

  function provideSuggestions(newValue, oldValue, scope){
    console.log("provide suggestions called", newValue);
    $scope.foundMatches = newValue+'randomStuff';
  }


  $scope.search = function() {
    var map = {};
    var text = $("#query").val();
    if (text.indexOf("GO:") == 0) {
      window.location.href = contextPath + "/term/" + text.substring(0, 11);
    } else if (text.indexOf("ECO:") == 0) {
      window.location.href = contextPath + "/term/" + text.substring(0, 12);
    } else if (isUniprotAccession(text)){//protein
      map["dbObjectId"] = text;
      searchCall(map, true);
    }else{ //text
      map["text"] = text;
      window.location = contextPath + "/search?query=" + JSON.stringify(map) + "&isProtein=false";
      $('#searched_text').html($(response).find('#searched_text'));
      $('#searchResultsArea').html($(response).find('#searchResultsArea'));
      $("#light-search-pagination").pagination('updateItems', $('input[name=total_number_results]').val());
      $("#light-search-pagination").pagination('selectPage', 1);
      $('#searchPageCount').html($(response).find('#searchPageCount'));
    }
  }
});
