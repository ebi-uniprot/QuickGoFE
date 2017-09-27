'use strict';

describe('Testing annotation filters', function(){

  var AdvancedFiltersCtrl, scope;

  beforeEach(function() {
    module('quickGoFeApp');
    
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      AdvancedFiltersCtrl = $controller('AdvancedFiltersCtrl', {
        $scope: scope
      });
    });
  });

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
