'use strict';

describe('filter service', function() {
  var filterService;

  beforeEach(module('quickGoFeApp'));

  beforeEach(inject(function(_filterService_) {
    filterService = _filterService_;
  }));

  it('should concatenate successfully', function(){
    var array1 = [{id:'1',checked:true},{id:'2',checked:false}];
    var array2 = [{id:'2',checked:true,item:{name:'blah'}},{id:'3',checked:false},{id:'4',checked:false}];
    var concat = filterService.mergeArrays(array1, array2);
    expect(concat.length).toBe(4);
    var item = _.find(concat, function(d){
      return d.id === '2';
    });
    expect(item.checked).toBe(true);
  });

});
