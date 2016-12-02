'use strict';

describe('Controller: StatisticsCtrl', function() {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var StatisticsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    StatisticsCtrl = $controller('StatisticsCtrl', {
      $scope: scope
    });
  }));

  it('should load statistics', function() {
    var statsMock = [{
      groupName: 'annotation',
      totalHits: 18,
      types: [{
        type: 'reference',
        values: [{
          key: 'GO_REF:0000024',
          percentage: 0.3888888888888889,
          hits: 7
        }]
      }, {
        type: 'goId',
        values: [{
          key: 'GO:0008270',
          percentage: 0.16666666666666666,
          hits: 3
        }]
      }, {
        type: 'assignedBy',
        values: [{
          key: 'UniProt',
          percentage: 0.8888888888888888,
          hits: 16
        }]
      }, {
        type: 'taxonId',
        values: [{
          key: '1396',
          percentage: 1,
          hits: 18
        }]
      }, {
        type: 'evidenceCode',
        values: [{
          key: 'ECO:0000314',
          percentage: 0.4444444444444444,
          hits: 8
        }]
      }, {
        type: 'aspect',
        values: [{
          key: 'molecular_function',
          percentage: 0.7222222222222222,
          hits: 13
        }]
      }]
    }, {
      groupName: 'geneProduct',
      totalHits: 7,
      types: [{
        type: 'reference',
        values: [{
          key: 'GO_REF:0000024',
          percentage: 0.5714285714285714,
          hits: 4
        }]
      }, {
        type: 'goId',
        values: [{
          key: 'GO:0008270',
          percentage: 0.2857142857142857,
          hits: 2
        }]
      }, {
        type: 'assignedBy',
        values: [{
          key: 'UniProt',
          percentage: 0.7142857142857143,
          hits: 5
        }]
      }, {
        type: 'taxonId',
        values: [{
          key: '1396',
          percentage: 1,
          hits: 7
        }]
      }, {
        type: 'evidenceCode',
        values: [{
          key: 'ECO:0000314',
          percentage: 0.42857142857142855,
          hits: 3
        }]
      }, {
        type: 'aspect',
        values: [{
          key: 'molecular_function',
          percentage: 1,
          hits: 7
        }]
      }]
    }];
    scope.processStatistics(statsMock);
    expect(scope.totalNumberAnnotations).toBe(25);
    expect(scope.stats.reference.annotation.length).toBe(1);
    expect(scope.stats.reference.geneProduct.length).toBe(1);
    expect(scope.stats.goId.annotation.length).toBe(1);
    expect(scope.stats.goId.geneProduct.length).toBe(1);
    expect(scope.stats.assignedBy.annotation.length).toBe(1);
    expect(scope.stats.assignedBy.geneProduct.length).toBe(1);
    expect(scope.stats.taxonId.annotation.length).toBe(1);
    expect(scope.stats.taxonId.geneProduct.length).toBe(1);
    expect(scope.stats.evidenceCode.annotation.length).toBe(1);
    expect(scope.stats.evidenceCode.geneProduct.length).toBe(1);
    expect(scope.stats.aspect.annotation.length).toBe(1);
    expect(scope.stats.aspect.geneProduct.length).toBe(1);
  });

});
