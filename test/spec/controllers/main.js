'use strict';

describe('Controller: SearchCtrl', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var SearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // scope = $rootScope.$new();
    // SearchCtrl = $controller('SearchCtrl', {
    //   $scope: scope
    // });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(1).toBe(1); //example
  });
});
