'use strict';

describe('Testing annotation filters', function(){
  
  beforeEach(module('quickGoFeApp'));
  
  var AdvancedFiltersCtrl, scope;
  
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    AdvancedFiltersCtrl = $controller('AdvancedFiltersCtrl', {
      $scope: scope
    });
  }));
  
  it('should add to query', function () {
    scope.addToQuery('test',['value 1', 'value2']);
    console.log(scope.query.test);
    expect(scope.query.test.length).toBe(2);
  });
  
});