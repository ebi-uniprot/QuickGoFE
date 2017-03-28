'use strict';

describe('Testing annotation filters', function() {

  beforeEach(module('quickGoFeApp'));

  var limitCheckerObj, rootScope;
  var items = [{
    checked: true
  }, {
    checked: true
  }, {
    checked: false
  }, {
    checked: true
  }, {
    checked: true
  }];

  beforeEach(inject(function(limitChecker, $rootScope) {
    limitCheckerObj = limitChecker;
    rootScope = $rootScope;
  }));

  it('should correctly count the number of checked itemes', function() {
    expect(limitCheckerObj.getAllChecked(items).length).toEqual(4);
  });

  it('should tell whether a list is over the limit', function() {
    expect(limitCheckerObj.isOverLimit(items, 2)).toBe(true);
    expect(limitCheckerObj.isOverLimit(items, 10)).toBe(false);
  });

  it('should merge items and add error if too many', function() {
    expect(rootScope.alerts.length).toEqual(1);
    var newItems = [{
      checked: true
    }];
    var merged = limitCheckerObj.getMergedItems(items, newItems, 1);
    expect(rootScope.alerts.length).toEqual(2);
    expect(merged.length).toEqual(items.length);
    merged = limitCheckerObj.getMergedItems(items, newItems, 100);
  });


});
