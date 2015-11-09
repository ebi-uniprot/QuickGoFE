app.controller('MegaSearchCtrl', function($scope,  $location, $routeParams, searchService) {

	var limit = 5;

	//Look for matching GO terms
	$scope.goTermsPromise = searchService.findTerms($routeParams.searchTerm, limit);
	$scope.goTermsPromise.then(function(res){
		$scope.terms = res.data.go;
	});


	//Look for Gene Products
	$scope.gpPromise = searchService.findGeneProducts($routeParams.searchTerm, limit);
	$scope.gpPromise.then(function(res){
		$scope.products = res.data.protein;
	});

	//Look for Publications
});
