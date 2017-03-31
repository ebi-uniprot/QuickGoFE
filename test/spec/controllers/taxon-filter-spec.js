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
      'taxonId':''
    };

    scope.stackErrors = function() {};
    taxonFilter = $controller('taxonFilter', {
      $scope: scope
    });
  }));


  it('should add valid taxonIds', function () {
    scope.taxonTextArea = '9606';
    scope.addTaxons();
    expect(scope.taxa.length).toEqual(1);
  });

  it('should not add invalid taxonIds', function () {
    scope.taxonTextArea = 'AAAA';
    scope.addTaxons();
    expect(scope.taxa.length).toEqual(0);
  });

});
