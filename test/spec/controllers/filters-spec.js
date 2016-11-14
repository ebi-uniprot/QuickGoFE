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
    expect(scope.query.test.length).toBe(2);
  });

  it('should clear the query', function() {
    scope.addToQuery('test',['value 1', 'value2']);
    scope.clearFilters();
    expect(scope.query).toEqual({});
  });

  it('should tell me whether the filter is active', function() {
    scope.addToQuery('test',['value 1', 'value2']);
    expect(scope.isActiveFilter('test')).toEqual(true);
    expect(scope.isActiveFilter('blah')).toEqual(false);
  });

});
