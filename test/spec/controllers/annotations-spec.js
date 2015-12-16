'use strict';

describe('Controller: AnnotationListCtrl', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var AnnotationListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    
    AnnotationListCtrl = $controller('AnnotationListCtrl', {
      $scope: scope
    });
  }));

  it('should start on page 1', function () {
    expect(scope.currentPage).toBe(1);
  });

  it('should move to page 2', function () {
    scope.currentPage = 2;
    expect(scope.currentPage).toBe(2);
  });


  it('should have a maxSize of 25', function () {
    expect(scope.maxSize).toBe(25);
  });
});
