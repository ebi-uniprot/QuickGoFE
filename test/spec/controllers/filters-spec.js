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

  it('should return a total below limit', function() {
    var total = scope.getNewTotalBasedOnLimit(3, 2);
    expect(total).toEqual(2);

    var total = scope.getNewTotalBasedOnLimit(1, 2);
    expect(total).toEqual(1);

    var total = scope.getNewTotalBasedOnLimit(2, 2);
    expect(total).toEqual(2);
  });

  it('should add limit error', function() {
    rootScope.cleanErrorMessages();
    scope.getTotalCheckedAfterHandlingLimitError(3,2);
    expect(rootScope.alerts.length).toEqual(1);
  });

  it('should add limit error', function() {
    rootScope.cleanErrorMessages();
    scope.getTotalCheckedAfterHandlingLimitError(2,3);
    expect(rootScope.alerts.length).toEqual(0);
  });

});
