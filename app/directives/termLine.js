angular
	.module('quickGoFeApp')
	.directive('termLine', [function(){
  return {
    restrict: 'E',
    scope: {
      id: '=',
      aspect: '=',
      obsolete: '=',
      name: '='
    },
    templateUrl: 'directives/termLine.html',
    link: function(scope){
      if(scope.id && scope.id.startsWith('ECO:')) {
        scope.isECO = true;
      }
    }
  }
}]);