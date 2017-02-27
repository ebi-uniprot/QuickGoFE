'use strict';

describe('Controller: qualifierFilter', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var qualifierFilter,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.query = {};
    scope.updateCheckStatus = function(term) {};
    qualifierFilter = $controller('qualifierFilter', {
      $scope: scope
    });
  }));

  it('should add select all NOT qualifiers', function () {
    scope.selectAllNotQualifiers();
    expect(_.filter(_.values(scope.qualifiers), 'checked').length).toEqual(5);
  });

});
