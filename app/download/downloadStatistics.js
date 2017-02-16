'use strict';
app.controller('DownloadStatsCtrl', function($scope) {

  $scope.groupedBy = {
    annotationCount: {label: 'Annotation count', value: 'annotationCount'},
    proteinCount: {label: 'Protein count', value: 'proteinCount'},
    both: {label: 'Both', value: 'both'}
  };

  $scope.groupedByValue = {
      selection: $scope.groupedBy.both.value
  };

  angular.forEach($scope.stats, function(stat) {
    stat.selected = true;
  });

  //TODO, whenever the service is ready
  /*$scope.submit = function() {
      downloadFile('', '', '');
  };

  function downloadFile(fileName, data, strMimeType) {
    strMimeType = strMimeType || 'text/plain;charset=utf-8;';

    var blob = new Blob([data], {type: strMimeType});
    saveAs(blob, fileName);
  } */

});
