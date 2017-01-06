'use strict';

describe('filter service', function() {
  var filterService;

  beforeEach(module('quickGoFeApp'));

  beforeEach(inject(function(_filterService_) {
    filterService = _filterService_;
  }));

  it('should concatenate successfully', function(){
    var array1 = [{id:'1',checked:true},{id:'2',checked:true}];
    var array2 = [{id:'2',checked:false},{id:'3',checked:false},{id:'4',checked:false}];
    var concat = filterService.concatUniqueAsChecked(array1, array2);
    expect(concat).toEqual([{id:'1',checked:true},{id:'2',checked:true},{id:'3',checked:false},{id:'4',checked:false}]);
  });

});
