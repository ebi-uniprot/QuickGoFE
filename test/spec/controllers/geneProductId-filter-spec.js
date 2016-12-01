'use strict';

describe('Controller: geneProductFilter', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var geneProductFilter,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.query = {};
    geneProductFilter = $controller('geneProductFilter', {
      $scope: scope
    });
  }));

  it('should add valid gene products', function () {
    expect(scope.gpIds.length).toEqual(0);
    scope.gpTextArea = 'A0A000';
    scope.addGPs();
    expect(scope.gpIds.length).toEqual(1);
  });

  it('should not add invalid gene products', function () {
    expect(scope.gpIds.length).toEqual(0);
    scope.gpTextArea = 'ABCDEFGHIJ_1234567890';
    scope.addGPs();
    expect(scope.gpIds.length).toEqual(0);
  });

});