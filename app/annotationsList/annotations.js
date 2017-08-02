'use strict';
app.controller('Annotations', function($scope, $location) {
    if (!angular.equals($location.search(), {})) {
        $scope.displayStats = true;
    }
    $scope.loadStatistics = function() {
        $scope.$broadcast('loadStatistics');
    };
});