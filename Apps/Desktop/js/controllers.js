angular.module('app.controllers', ['ngFileUpload','ionic'])
  
.controller('page3Ctrl', ['$scope', '$stateParams','Upload','$ionicLoading','LoaderService','$log','ItemInfoService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Upload,$ionicLoading,LoaderService,$log,ItemInfoService,UserInfoService) {
    //$log.debug(CONFIG_ENV);
    //age drag input
    $scope.drag = function(value) {
        $scope.years = Math.floor(value / 12);
        if(value<=44){
            $scope.yearsR = "青年";
        }else if(value>=60){
            $scope.yearsR = "老年";
        }else {
            $scope.yearsR = "中年";
        }
    };
    $scope.rangeValue = 0;
//
    $scope.itemInfoId = -1;
    $scope.itemDetailId = -1;
    //FileUploader,@see:https://github.com/danialfarid/ng-file-upload
    // upload on file select or drop
    $scope.uploadItemInfo = function (file) {
        Upload.upload({
            url: "http://localhost:8080"+'/td/upload/timage',
            data: {file: file}
        }).then(function (resp) {
            //
            LoaderService.hide();
            //
            $log.debug('Success ' + resp.config.data.file.name + ',uploaded. Response: ');
            $log.info(resp.data.data);
            $scope.itemInfoId = resp.data.data.id;
        }, function (resp) {
            $log.error('Error status: ' + resp.status);
        }, function (evt) {
            //
            LoaderService.show();

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    // upload on file select or drop
    $scope.uploadItemDetail = function (file) {
        Upload.upload({
            url: "http://localhost:8080"+'/td/upload/tcsv',
            data: {file: file}
        }).then(function (resp) {
            //
            LoaderService.hide();
            //
            $log.debug('Success ' + resp.config.data.file.name + ',uploaded. Response: ');
            $log.info(resp.data.data);
            $scope.itemDetailId = resp.data.data.id;
            //
            ItemInfoService.put({"Id":$scope.itemInfoId,"dId":$scope.itemDetailId});
        }, function (resp) {
            $log.error('Error status: ' + resp.status);
        }, function (evt) {
            //
            LoaderService.show();

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

}])
   
.controller('page4Ctrl', ['$scope', '$stateParams','$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicModal) {
    $scope.items = [
        {
            "id": 1,
            "name": "专家指导"
        },
        {
            "id": 2,
            "name": "专家指导"
        },
        {
            "id": 3,
            "name": "专家指导"
        }
    ];
    $scope.modal = null;
    $ionicModal.fromTemplateUrl('templates/detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.getdetails = function(id){
        $scope.currentItem = id;
        $scope.modal.show();

    };
}])
    