app.controller('MegaSearchCtrl', function($scope,  $location, $routeParams, searchService) {
	$scope.searchTerm = $routeParams.searchTerm;
});
