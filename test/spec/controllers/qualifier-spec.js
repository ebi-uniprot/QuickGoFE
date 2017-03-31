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
    scope.selectItem = function() {};
    scope.subscribedFilters = {
      qualifier:0
    };
    qualifierFilter = $controller('qualifierFilter', {
      $scope: scope
    });
  }));

  it('should add select all NOT qualifiers', function () {
    scope.selectAllNotQualifiers();
    expect(_.filter(_.values(scope.qualifiers), 'checked').length).toEqual(5);
  });

});
