/**
 * Created by twardell on 07/05/2015.
 */

app.controller('DownloadCtrl', function($scope, $http, $uibModalInstance, $location, filteringService,
                                            hardCodedDataService, ENV) {

  $scope.selectedLimit=1000;  //default

  $scope.downloadFileFormats=hardCodedDataService.getDownloadFileFormats();
  $scope.selectedFormat = $scope.downloadFileFormats[1] ; //default to gpad

  //New


  /**
   * process request and start download
   */
  $scope.submit = function(format,limit) {
    var formattedURL = ENV.apiEndpoint+"/ws/downloadPostNewNamesNotSpring";

    var filterRequest = {};
    filterRequest.list =  filteringService.getFilters();
    filterRequest.limit = limit;
    filterRequest.format = format.ext;
    var fileName='download.'+ format.ext;

    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: formattedURL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };


    $scope.downloadPromise = $http(request);

    $scope.downloadPromise.success(function(data) {
      downloadFile(fileName, data)
    });

  };


    /**
   * Close window
   */
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };




  function downloadFile(fileName, data, strMimeType) {
    var D = document;
    var a = D.createElement('a');
    strMimeType = strMimeType || 'application/octet-stream;charset=utf-8';
    var rawFile;

    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], {
        type: strMimeType
      }), fileName);
    }

    //html5 A[download]
    if ('download' in a) {
      var blob = new Blob([data], {
        type: strMimeType
      });
      rawFile = URL.createObjectURL(blob);
      a.setAttribute('download', fileName);
    } else {
      rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(data);
      a.setAttribute('target', '_blank');
    }

    a.href = rawFile;
    a.setAttribute('style', 'display:none;');
    D.body.appendChild(a);
    setTimeout(function() {
      if (a.click) {
        a.click();
        // Workaround for Safari 5
      } else if (document.createEvent) {
        var eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        a.dispatchEvent(eventObj);
      }
      D.body.removeChild(a);

    }, 100);
  }


});
