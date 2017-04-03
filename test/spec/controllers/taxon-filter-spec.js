'use strict';

describe('Controller: taxonFilter', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var taxonFilter, scope, addNewDeferred, taxonomyService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    scope.query = {
      'taxonId':''
    };

    taxonomyService = jasmine.createSpyObj('taxonomyService', ['initTaxa', 'addNewTaxa']);
    taxonomyService.initTaxa.and.callFake(function() {
      var initDeferred = $q.defer();
      initDeferred.resolve({taxa: []});
      return initDeferred.promise;

    });
    taxonomyService.addNewTaxa.and.callFake(function() {
      addNewDeferred = $q.defer();
      return addNewDeferred.promise;
    });

    scope.stackErrors = function() {};
    taxonFilter = $controller('taxonFilter', {
      $scope: scope,
      taxonomyService: taxonomyService
    });
  }));


  it('should add valid taxonIds', function () {
    scope.taxonTextArea = '9606';
    scope.addTaxons();
    addNewDeferred.resolve({taxa: [{"id":"9606","item":{"name":"Homo sapiens","id":"9606"},"checked":true}]});
    scope.$digest();
    expect(scope.taxa.length).toEqual(1);
  });

  it('should not add invalid taxonIds', function () {
    scope.taxonTextArea = 'AAAA';
    scope.addTaxons();
    addNewDeferred.resolve({taxa: []});
    scope.$digest();
    expect(scope.taxa.length).toEqual(0);
  });

});
