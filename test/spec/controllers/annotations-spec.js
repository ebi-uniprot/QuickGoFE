'use strict';

describe('Controller: AnnotationListCtrl', function () {

  var AnnotationListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(function() {
    module('quickGoFeApp');
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      
      AnnotationListCtrl = $controller('AnnotationListCtrl', {
        $scope: scope
      });
    });
  });

  it('should start on page 1', function () {
    expect(scope.currentPage).toBe(1);
  });

  it('should move to page 2', function () {
    scope.currentPage = 2;
    expect(scope.currentPage).toBe(2);
  });


  it('should have a maxSize of 25', function () {
    expect(scope.itemsPerPage).toBe(25);
  });

  it('should never have more than 25 pages', function() {
    scope.totalItems = (scope.pageLimit * scope.itemsPerPage) -1;
    scope.currentPage = 19;
    var count = scope.getNumberOfElementsForPaging();
    expect(count).toBeLessThan(scope.pageLimit * scope.itemsPerPage);
    scope.totalItems = (scope.pageLimit * scope.itemsPerPage) +1;
    scope.currentPage = 21;
    count = scope.getNumberOfElementsForPaging();
    expect(count).toBe(scope.pageLimit * scope.itemsPerPage);
  });
});
