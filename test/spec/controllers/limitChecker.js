'use strict';

describe('Testing annotation filters', function(){

  beforeEach(module('quickGoFeApp'));

  var limitCheckerObj, rootScope;

  beforeEach(inject(function(limitChecker, $rootScope) {
    limitCheckerObj = limitChecker;
    rootScope = $rootScope;
  }));

  it('should return a total below limit', function() {
    var total = limitCheckerObj.getNewTotalBasedOnLimit(3, 2, 2);
    expect(total).toEqual(2);

    var total = limitCheckerObj.getNewTotalBasedOnLimit(1, 1, 2);
    expect(total).toEqual(1);

    var total = limitCheckerObj.getNewTotalBasedOnLimit(2, 2, 2);
    expect(total).toEqual(2);
  });

  it('should add limit error', function() {
    rootScope.cleanErrorMessages();
    limitCheckerObj.getTotalCheckedAfterHandlingLimitError(3,2);
    expect(rootScope.alerts.length).toEqual(1);
  });

  it('should add limit error', function() {
    rootScope.cleanErrorMessages();
    limitCheckerObj.getTotalCheckedAfterHandlingLimitError(1, 2,3);
    expect(rootScope.alerts.length).toEqual(0);
  });

});
