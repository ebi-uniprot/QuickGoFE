/**
 * Created by twardell on 16/03/2015.
 */

app.controller('AnnotationSidebarCtrl', function($scope, $modal) {

  console.log("Annotation Sidebar Controller");

  $scope.removeFilter=function(filter) {

    //Need to emit change to annotationList.js
  }


  $scope.showAdvancedFilters = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/advancedFiltersModal.html',
      controller: 'AdvancedFiltersCtrl',
      windowClass: 'app-modal-window',
      scope: $scope
      //resolve: {
      //  countBasket: function () {
      //    return $scope.countBasket;
      //  }
      //}
    });


  }

});
