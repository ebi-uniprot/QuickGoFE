angular
  .module('quickGoFeApp')
  .directive('aspectIcon', [function() {
    return {
      restrict: 'E',
      scope: {
        aspect: '='
      },
      template: '<span tooltip="{{aspect}}" class="has-tip aspect-icon aspect-{{aspect}}"></span>'
    };
  }]);
