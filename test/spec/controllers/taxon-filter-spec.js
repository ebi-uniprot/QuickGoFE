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

});
