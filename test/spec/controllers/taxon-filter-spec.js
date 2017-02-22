'use strict';

describe('Controller: taxonFilter', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var taxonFilter,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.query = {
      'taxonId':'9606'
    };
    taxonFilter = $controller('taxonFilter', {
      $scope: scope
    });
  }));

  it('should not add invalid taxonIds', function () {
    expect(scope.taxa.length).toEqual(1);
    scope.taxonTextArea = 'AAAA';
    scope.addTaxons();
    expect(scope.taxa.length).toEqual(1);
  });

  it('should remove taxIds', function() {
    var taxas = [{id: '1234'},{id: '2345'},{id: '3456'}];
    var removeTaxIds = [1234, 3456];
    var results = scope.removeTaxIds(removeTaxIds, taxas);
    expect(results.length).toEqual(1);
  });

});
