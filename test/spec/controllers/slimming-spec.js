'use strict';

describe('Testing GO Slims', function () {

  // load the controller's module
  beforeEach(module('quickGoFeApp'));

  var GOSlimCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    
    GOSlimCtrl = $controller('GOSlimCtrl', {
      $scope: scope
    });
  }));

});
