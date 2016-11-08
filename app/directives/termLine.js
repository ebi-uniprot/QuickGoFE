angular
	.module('quickGoFeApp')
	.directive('termLine', [function(){
  return {
    restrict: 'E',
    scope: {
      term: '='
    },
    templateUrl: 'directives/termLine.html',
    link: function(scope){
//      console.log(scope.term)
    }
  }
}]);