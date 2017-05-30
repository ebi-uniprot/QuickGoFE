'use strict';

describe('Controller: qualifierFilter', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var qualifierFilter, presetsDeferred, presetsService, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    scope.query = {};
    scope.selectItem = function() {};
    scope.subscribedFilters = {
      qualifier:0
    };

    presetsService= jasmine.createSpyObj('presetsService', ['getPresetsQualifiers']);
    presetsService.getPresetsQualifiers.and.callFake(function() {
      presetsDeferred = $q.defer();
      return presetsDeferred.promise;
    });


    qualifierFilter = $controller('qualifierFilter', {
      $scope: scope,
      presetsService: presetsService
    });
  }));

  it('should add select all NOT qualifiers', function () {
    presetsDeferred.resolve({data: {qualifiers: [
      {id: 'enables', name: 'enables'},
      {id: 'not|enables', name: 'not|enables'},
      {id: 'not|part_of', name: 'not|part_of'},
    ]}});
    scope.$digest();
    scope.selectAllNotQualifiers();
    expect(_.filter(_.values(scope.qualifiers), 'checked').length).toEqual(2);
  });

});
