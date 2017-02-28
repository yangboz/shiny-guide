// angular.module('app.controllers', ['ngFileUpload','pubnub.angular.service'])
angular.module('app.controllers', ['app.services','ngFileUpload','pubnub.angular.service'])
    .controller('MainCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$ionicModal,$log) {
           $log.info("MainCtrl...");
            //root scope variables for modal.
            $rootScope.consultModal = null;
            $rootScope.userInfos = [];
            $rootScope.itemInfos = [];
            $rootScope.instructions = [];
            $rootScope.pescriptions = [];
            //ConsultModal
            $ionicModal.fromTemplateUrl('templates/modal-consult.html', {
                scope: $scope,
                backdropClickToClose: false
            }).then(function (modal) {
//        console.log("modal-login.html init!!!");
                $rootScope.consultModal = modal;
                //
            });
            $rootScope.showAlert = function($msg) {
                var alertPopup = $ionicPopup.alert({
                    title: $msg
                    // template: 'It might taste good'
                });

                alertPopup.then(function (res) {
                    // console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
        })
//
.controller('page3Ctrl', function ($rootScope,$scope,$stateParams,$ionicModal,CONFIG_ENV,Upload,$ionicLoading,$log,UpdateItemInfoService,UserInfoService,Enum,Pubnub) {


//PubNub
    Pubnub.init({
        publishKey: CONFIG_ENV.pubnub_key,
        subscribeKey: CONFIG_ENV.pubnub_secret
    });
    $log.info("CONFIG_ENV:",CONFIG_ENV);
    //ng-model
    $scope.userInfo = {name:"", gender:1,age:10, itemId: "",itemDetailId:""};
    $scope.yearsR = "青年";
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
//
        //FileUploader,@see:https://github.com/danialfarid/ng-file-upload
        // upload on file select or drop
        $scope.uploadItemInfo = function (file) {
            Upload.upload({
                url: CONFIG_ENV.api_endpoint+'upload/timage',
                data: {file: file}
            }).then(function (resp) {
                //
                $log.debug('Success ' + resp.config.data.file.name + ',uploaded. Response: ');
                $log.info(resp.data.data);
                $scope.userInfo.itemId = resp.data.data.id;
            }, function (resp) {
                $log.error('Error status: ' + resp.status);
            }, function (evt) {
                // console.log('evt:'+evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        // upload on file select or drop
        $scope.uploadItemDetail = function (file) {
            Upload.upload({
                url: CONFIG_ENV.api_endpoint+'upload/tcsv',
                data: {file: file}
            }).then(function (resp) {
                //
                $log.debug('Success ' + resp.config.data.file.name + ',uploaded. Response: ');
                $log.info(resp.data.data);
                $scope.userInfo.itemDetailId = resp.data.data.id;
                //UPDATE
                var updateItemInfo = new UpdateItemInfoService();
                updateItemInfo.$update({"Id":$scope.userInfo.itemId,"dId":$scope.userInfo.itemDetailId},function (resp) {
                    $log.info("updateItemInfo() success, response:", resp);
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            }, function (resp) {
                $log.error('Error status: ' + resp.status);
            }, function (evt) {

                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
        //Select bind
        $scope.preferencesItemType = Enum.genderType;
        $scope.prefGender = Enum.genderType[0];//Default male.
        $scope.setTypeSelected = function (type) {
            $scope.prefGender = type;
            $scope.userInfo.gender = type.data;
        }

        //CREATE,
        $scope.saveUserInfo = function () {
            //
            console.log($scope.userInfo);
            var anewUserInfo = new UserInfoService();
            anewUserInfo.age = $scope.userInfo.age;
            anewUserInfo.name = $scope.userInfo.name;
            anewUserInfo.gender = $scope.userInfo.gender;
            anewUserInfo.itemId = $scope.userInfo.itemId;
            //return $log.debug("createItem(),$scope.newItem:", anewItem);
            //Save
            anewUserInfo.$save(function (resp) {
                $log.info("createUserInfo() success, response:", resp);
               //prompt consulting
                $rootScope.consultModal.show();
            }, function (resp) {
                $log.error('Error status: ' + resp.status);
            });
        }
})
   
.controller('page4Ctrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
})
    .controller('ConsultCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$log,$ionicModal,UserInfoService,ItemInfoService,InstructionService,PrescriptionService,ConsultInfoService,UpdateUserInfoService) {
            //GET
            $scope.loadUserInfos = function () {

                UserInfoService.get({}, function (response) {
                    $log.debug("UserInfoService.get() success!", response.data);
                    $rootScope.userInfos = response.data;
                }, function (error) {
                    // failure handler
                    $log.error("UserInfoService.get() failed:", JSON.stringify(error));
                });
            };
            //GET
            $scope.loadItemInfos = function () {

                ItemInfoService.get({}, function (response) {
                    $log.debug("ItemInfoService.get() success!", response.data);
                    $rootScope.itemInfos = response.data;
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            };
            //GET
            $scope.loadInstructions = function () {

                InstructionService.get({}, function (response) {
                    $log.debug("InstructionService.get() success!", response.data);
                    $rootScope.instructions = response.data;
                }, function (error) {
                    // failure handler
                    $log.error("InstructionService.get() failed:", JSON.stringify(error));
                });
            };
            //GET
            $scope.loadPrescriptions = function () {
                PrescriptionService.get({}, function (response) {
                    $log.debug("PrescriptionService.get() success!", response);
                    $rootScope.pescriptions = response.data;
                }, function (error) {
                    // failure handler
                    $log.error("PrescriptionService.get() failed:", JSON.stringify(error));
                });
            }

            $scope.loadUserAndItemInfos = function () {
                console.log("loadUserAndItemInfos...");
                $scope.loadUserInfos();//FIXME: load a sequence chain.
                $scope.loadItemInfos();
            }
            $scope.loadInsAndPres = function () {
                console.log("loadInsAndPres...");
                $scope.loadInstructions();//FIXME: load a sequence chain.
                $scope.loadPrescriptions();
            }
            //Select binding
            $scope.selectedUserInfo = $rootScope.userInfos[0];//Default 0ne.
            $scope.selectedItemInfo= $rootScope.itemInfos[0];//Default 0ne.
            $scope.selectedInstruction = $rootScope.instructions[0];//Default 0ne.
            $scope.selectedPrescription = $rootScope.pescriptions[0];//Default 0ne.
            //CREATE
            $scope.createConsultInfo  = function () {
                //
                var anewConsultInfo = new ConsultInfoService();
                $log.info("selectedInstruction:",$scope.selectedInstruction);
                $log.info("selectedPrescription:",$scope.selectedPrescription);
                anewConsultInfo.iid = $rootScope.selectedInstruction.id;
                anewConsultInfo.pid = $rootScope.selectedPrescription.id;
                $log.info("anewConsultInfo:",anewConsultInfo);
                //Save
                anewConsultInfo.$save(function (resp) {
                    $log.info("createConsultInfo() success, response:", resp);
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            };
           //UPDATE
            $scope.updateUserInfo = function ($cid) {
                var updateUserInfo = new UpdateUserInfoService();
                updateUserInfo.$update({"Id":$scope.userInfo.id,"cId":$cid},function (resp) {
                    $log.info("updateUserInfo() success, response:", resp);
                    //alert success.
                    $rootScope.showAlert("成功!");
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            };
            //
            $log.info("ConsultCtrl initialize...");
            $scope.loadUserAndItemInfos();
            $scope.loadInsAndPres();
        })
    