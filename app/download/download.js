/**
 * Created by twardell on 07/05/2015.
 */

app.controller('DownloadCtrl', function($scope, $http, $uibModalInstance, $location, filteringService,
                                            hardCodedDataService, ENV) {

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

    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], {
        type: strMimeType
      }), fileName);
    } else {
      var D = document;
      var a = D.createElement('a');
      a.setAttribute('download', fileName);
      a.setAttribute('style', 'display:none;');
      a.setAttribute('target', '_blank');
      D.body.appendChild(a);

      if ('download' in a) {
        var blob = new Blob([data], {type: strMimeType});
        var rawDataURL = (window.URL || window.webkitURL).createObjectURL(blob);
        a.href = rawDataURL;

        setTimeout(function() {
          if (a.click) {
            a.click();
          } else if (document.createEvent) {
            var eventObj = document.createEvent('MouseEvents');
            eventObj.initEvent('click', true, true);
            a.dispatchEvent(eventObj);
          }
          D.body.removeChild(a);
        }, 100);
      } else {
        var blob = new Blob([data], {type: "text/plain;charset=utf-8;"});
        saveAs(blob, fileName);
        D.body.removeChild(a);
      }
    }
  }


});
