'use strict';

describe('Testing annotation filters', function(){

  beforeEach(module('quickGoFeApp'));

  var AdvancedFiltersCtrl, scope, rootScope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    AdvancedFiltersCtrl = $controller('AdvancedFiltersCtrl', {
      $scope: scope
    });
  }));

  it('should add to query', function () {
    scope.addToQuery('test',['value 1', 'value2']);
    expect(scope.query.test.length).toBe(2);
  });

  it('should clear the query', function() {
    scope.addToQuery('test',['value 1', 'value2']);
    scope.clearFilters();
    expect(scope.query).toEqual({});
  });

});
