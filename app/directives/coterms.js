angular
    .module('quickGoFeApp')
    .directive('coterms', ['$http', 'termService', function($http, termService){
        return {
            restrict: 'E',
            scope: {
                id: '=',
                mode: '=',
                limit: '=',
                pageSize: '=',
                tableId: '='
            },
            templateUrl: 'directives/coterms.html',
            link: function(scope){
                scope.goTermMapping = {};
                scope.totalTogether = 0;
                scope.totalCompared = 0;

                var getAdditionalGOTerms = function() {
                    termService.getGOTerms(_.keys(scope.goTermMapping)).then(function (resp) {
                        angular.forEach(resp.data.results, function (goTerm) {
                            scope.goTermMapping[goTerm.id] = goTerm;
                        });
                    });
                };

                var statsPromise = scope.mode === 'ALL'
                    ? termService.getAllStats(scope.id, scope.limit)
                    : termService.getManualStats(scope.id, scope.limit);
                statsPromise.then(function(d) {
                    scope.stats = d.data;
                    scope.displayLimit = Math.min(+scope.limit, +d.data.numberOfHits);
                    angular.forEach(d.data.results, function(val){
                        scope.goTermMapping[val.comparedTerm] = scope.goTermMapping[val.comparedTerm] || {};
                        scope.totalTogether += +val.together;
                        scope.totalCompared += +val.compared;
                    });
                    getAdditionalGOTerms();
                });
            }
        }
    }]);