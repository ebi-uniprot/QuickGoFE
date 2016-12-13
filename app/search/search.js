app.controller('SearchCtrl', function($rootScope, $scope,  $location, $routeParams, searchService) {
	$scope.searchTerm = $routeParams.searchTerm;
	$rootScope.fullWidthPage = false;
});
