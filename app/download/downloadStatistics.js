app.controller('DownloadStatsCtrl', function($scope, $http, $location) {

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

  $scope.submit = function() {
      //TODO download
  };

  function downloadFile(fileName, data, strMimeType) {
    strMimeType = strMimeType || 'text/plain;charset=utf-8;';

    var blob = new Blob([data], {type: strMimeType});
    saveAs(blob, fileName);
  }

});
