app.controller('SearchCtrl', function($scope,  $location, $routeParams) {
	$scope.searchTerm = $routeParams.searchTerm;
});
