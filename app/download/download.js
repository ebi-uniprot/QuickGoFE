/**
 * Created by twardell on 07/05/2015.
 */

app.controller('DownloadCtrl', function($scope, $http, $uibModalInstance, $location, filteringService,
                                            hardCodedDataService, ENV, FileSaver, Blob) {

  $scope.selectedLimit=1000; //default

  $scope.downloadFileFormats=hardCodedDataService.getDownloadFileFormats();
  $scope.selectedFormat = $scope.downloadFileFormats[1] ; //default to gpad

  //New


  /**
   * process request and start download
   */
  $scope.submit = function(format,limit) {

    var filterRequest = {};
    filterRequest.list =  filteringService.populateAppliedFilters();
    filterRequest.limit = limit;
    filterRequest.format = format.ext;
    var fileName='download.'+ format.ext;

    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: ENV.apiEndpoint+"/downloadPostNewNamesNotSpring",
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };

    $scope.downloadPromise = $http(request);

    $scope.downloadPromise.success(function(data) {
      downloadFile(fileName, data);
      $uibModalInstance.dismiss('cancel');
    });
  };


    /**
   * Close window
   */
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };




  function downloadFile(fileName, data, strMimeType) {
    strMimeType = strMimeType || 'application/octet-stream;charset=utf-8';
    var exportLink = $('#quickGO-download-export-link');

    if ('download' in exportLink.get(0)) {
      var blob = new Blob([data], {type: strMimeType});
      FileSaver.saveAs(blob, fileName);
    } else {
      var blob = new Blob([data], {type: "text/plain;charset=utf-8;"});
      saveAs(blob, fileName);
    }
  }


});
