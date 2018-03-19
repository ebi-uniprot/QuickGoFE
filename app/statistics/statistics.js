'use strict';
app.controller('StatisticsCtrl', function($scope, $routeParams, searchService, termService, downloadService) {

    $scope.stats = {
        'reference': { label: 'Reference', selected: true, about:'' },
        'goId': { label: 'GO ID', selected: true, about:'' },
        'assignedBy': { label: 'Assigned By', selected: true, about:'' },
        'taxonId': { label: 'Taxon', selected: true, about:'' },
        'evidenceCode': { label: 'Evidence', selected: true, about:'' },
        'aspect': { label: 'Aspect', selected: true, about:'' },
        'annotationsForGoId': {label: 'Slim summary', selected: true, about:'' },
        'geneProductId': {label: 'Gene Product ID', selected: true, about:'' }
    };

    $scope.totalNumberAnnotations = 0;
    $scope.totalNumberGeneProducts = 0;
    var query = $routeParams;

    function postProcessGoTerms() {
        var goTermIds = [];
        angular.forEach($scope.stats.goId.annotation, function(elem) {
            goTermIds.push(elem.key);
        });
        angular.forEach($scope.stats.annotationsForGoId.geneProduct, function(elem) {
            goTermIds.push(elem.key);
        });

        $scope.goTermMapping = {};
        termService.getGOTerms(goTermIds).then(function(resp) {
            angular.forEach(resp.data.results, function(goTerm) {
                $scope.goTermMapping[goTerm.id] = goTerm;
            });
        });
    }

    $scope.processStatistics = function(stats) {
        $scope.totalNumberAnnotations = 0;
        angular.forEach(stats, function(item) {
            if (item.groupName === 'annotation') {
                angular.forEach(item.types, function(type) {
                    $scope.stats[type.type].annotation = type.values;
                    $scope.stats[type.type].approximateCount = type.approximateCount;
                    $scope.totalNumberAnnotations = item.totalHits;
                });
            } else if (item.groupName === 'geneProduct') {
                angular.forEach(item.types, function(type) {
                    $scope.stats[type.type].geneProduct = type.values;
                    $scope.totalNumberGeneProducts = item.totalHits;
                });
            } else if (item.groupName === 'slimming') {
                angular.forEach(item.types, function(type) {
                    $scope.stats[type.type].geneProduct = type.values;
                    $scope.stats[type.type].approximateCount = type.approximateCount;
                    $scope.totalNumberAnnotations = item.totalHits;
                });
            }
        });
        if (stats.length <= 0) {
            $scope.noStatsFound = true;
        }
        postProcessGoTerms();
    };

    function loadStatistics() {
        $scope.statsPromise = searchService
            .findAnnotationStatistics(searchService.serializeQuery(query));
        $scope.statsPromise.then(function(data) {
            $scope.processStatistics(data.data.results);
        });
    }

    $scope.$on('loadStatistics', function() {
        loadStatistics();
    });

    /**
     * process request and start download
     */
    $scope.submit = function() {
        $scope.downloadPromise = downloadService.getStatisticsData('application/vnd.ms-excel', $routeParams, "blob");
        $scope.downloadPromise.then(function(response) {
            var now = new Date();
            var filename = 'QuickGO-statistics-' + now.getTime() + '-' + now.toISOString().split('T')[0].replace(/-/g,'')
                + '.xls';
            saveAs(response.data, filename);
        }, function(reason) {
            console.log('ERROR (statistics download):', reason)
        });
    };

});
