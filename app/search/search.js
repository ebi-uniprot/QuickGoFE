'use strict';
app.controller('SearchCtrl', function($scope,  $location, $routeParams) {
	$scope.searchTerm = $routeParams.searchTerm
    .replace(/\[(.*)\]/, "%5B$1%5D");
});
