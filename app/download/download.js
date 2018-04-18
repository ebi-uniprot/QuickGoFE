/*jshint laxbreak: true */
'use strict';
app.controller('DownloadCtrl', function(
  $scope,
  $http,
  $routeParams,
  hardCodedDataService,
  downloadService,
  FileSaver,
  Blob
) {
  $scope.selectedLimit = 1000; //default

  $scope.downloadFileFormats = hardCodedDataService.getDownloadFileFormats();
  $scope.selectedFormat = $scope.downloadFileFormats[1]; //default to gpad

  /**
   * process request and start download
   */
  $scope.submit = function(format, limit) {
    limit = Math.min(limit, downloadService.getMaxLimit());
    var selectedFields = [];
    _.each($scope.columns, function(column) {
      if (column.visible === true && column.downloadLabel) {
        selectedFields.push(column.downloadLabel);
      }
    });
    if (format.ext === 'tsv') {
      selectedFields.push('goaspect');
    }
    $scope.downloadPromise = downloadService.getAnnotationsData(
      format.ext,
      limit,
      $routeParams,
      selectedFields
    );
    $scope.downloadPromise.then(function(response) {
      var now = new Date();
      var filename =
        'QuickGO-annotations-' +
        now.getTime() +
        '-' +
        now
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '') +
        '.' +
        format.ext;
      downloadFile(filename, response.data, format.strMimeType);
    });
  };

  function downloadFile(fileName, data, strMimeType) {
    strMimeType = strMimeType || 'text/plain;charset=utf-8;';

    var blob = new Blob([data], { type: strMimeType });
    FileSaver.saveAs(blob, fileName);
  }
});
