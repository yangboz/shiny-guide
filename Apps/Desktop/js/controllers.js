// angular.module('app.controllers', ['ngFileUpload','pubnub.angular.service'])
angular.module('app.controllers', ['app.services','ngFileUpload','pubnub.angular.service'])
    .controller('MainCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$ionicModal,$log,$ionicPopup) {
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
.controller('page3Ctrl', function ($rootScope,$scope,$stateParams,$ionicModal,CONFIG_ENV,Upload,$ionicLoading,$log,UpdateItemInfoService,UserInfoService,Enum,Pubnub,RecommendUserService,RecommendItemService) {
//
//PubNub
    Pubnub.init({
        publishKey: CONFIG_ENV.pubnub_key,
        subscribeKey: CONFIG_ENV.pubnub_secret
    });
    $log.info("CONFIG_ENV:",CONFIG_ENV);
    //ng-model
    $scope.userInfo = {name:"", gender:1,age:50, itemId: "",itemDetailId:""};
    $scope.yearsR = "中年";
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

            if(!file){
                $log.error("None file selected.");
            }
            Upload.upload({
                url: CONFIG_ENV.api_endpoint+'upload/timage',
                data: {file: file}
            }).then(function (resp) {
                //
                $log.info('Success ' + resp.config.data.file.name + ',uploaded. Response: ');
                $scope.userInfo.itemId = resp.data.data.id;
            }, function (resp) {
                $log.error('Error status: ' + resp.status);
            }, function (evt) {
                // console.log('evt:'+evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //
                $log.info('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        // upload on file select or drop
        $scope.uploadItemDetail = function (file) {
            if(!file){
                $log.error("None file selected.");
            }
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
        $scope.createUserInfo = function () {
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
                var anewUserId = resp.data.id;
                $rootScope.showAlert("采集成功!");
               //TODO:auto consulting/recommendation
               //  RecommendUserService.get({id:anewUserId}, function (response) {
               //      $log.debug("RecommendUserService.get(",anewUserId,") success!", response.data);
               //  }, function (error) {
               //      // failure handler
               //      $log.error("RecommendUserService.get() failed:", JSON.stringify(error));
               //  });

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
        //
            //Select binding
            $scope.selectedUserInfo = null;
            $scope.selectedItemInfo= null;
            $scope.selectedInstruction = null;
            $scope.selectedPrescription = null;
            //GET
            $scope.loadUserInfos = function () {

                UserInfoService.get({}, function (response) {
                    $log.info("UserInfoService.get() success!", response.data);
                    $rootScope.userInfos = response.data;
                    //Select binding
                    $scope.selectedUserInfo = $rootScope.userInfos[0];//Default 0ne.
                    $log.debug("selectedUserInfo:",$scope.selectedUserInfo);
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
                    //Select binding
                    $scope.selectedItemInfo= $rootScope.itemInfos[0];//Default 0ne.
                    $log.debug("selectedItemInfo:",$scope.selectedItemInfo);
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            };
            //GET
            $scope.loadInstructions = function () {
                InstructionService.get({}, function (response) {
                    $log.info("InstructionService.get() success!", response.data);
                    $rootScope.instructions = response.data;
                    //Select binding
                    $scope.selectedInstruction = $rootScope.instructions[0];//Default 0ne.
                    $log.debug("selectedInstruction:",$scope.selectedInstruction);
                }, function (error) {
                    // failure handler
                    $log.error("InstructionService.get() failed:", JSON.stringify(error));
                });
            };
            //GET
            $scope.loadPrescriptions = function () {
                PrescriptionService.get({}, function (response) {
                    $log.info("PrescriptionService.get() success!", response);
                    $rootScope.pescriptions = response.data;
                    //Select binding
                    $scope.selectedPrescription = $rootScope.pescriptions[0];//Default 0ne.
                    $log.debug("selectedPrescription:",$scope.selectedPrescription);
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
            //CREATE
            $scope.createConsultInfo  = function () {
                //
                var anewConsultInfo = new ConsultInfoService();
                $log.info("selectedInstruction:",$scope.selectedInstruction);
                $log.info("selectedPrescription:",$scope.selectedPrescription);
                anewConsultInfo.iid = $scope.selectedInstruction.id;
                anewConsultInfo.pid = $scope.selectedPrescription.id;
                $log.info("anewConsultInfo:",anewConsultInfo);
                //Save
                anewConsultInfo.$save(function (resp) {
                    $log.info("CREATE ConsultInfoService() success, response:", resp);
                    var savedConsultId = resp.data.id;
                    //
                    $scope.updateUserInfo(savedConsultId);
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            };
           //UPDATE
            $scope.updateUserInfo = function ($cid) {
                var updateUserInfo = new UpdateUserInfoService();
                updateUserInfo.$update({"Id":$scope.selectedUserInfo.id,"cId":$cid},function (resp) {
                    $log.info("updateUserInfo() success, response:", resp);
                    //alert success.
                    $rootScope.showAlert("答诊成功!");
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            };
            //SELECT change
            $scope.setUserInfoSelected = function ($selected) {
                $scope.selectedUserInfo = $selected;//refresh.
                $log.debug("SELECTED userInfo:",$scope.selectedUserInfo);
                //drill down the item info for select.
                ItemInfoService.get({id:$selected.itemId}, function (response) {
                    $log.debug("ItemInfoService.get(",$selected.itemId,") success!", response.data);
                    $rootScope.itemInfos = [];
                    $rootScope.itemInfos.push(response.data);
                    //Select binding
                    $scope.selectedItemInfo= $rootScope.itemInfos[0];//Default 0ne.
                    $log.debug("selectedItemInfo:",$scope.selectedItemInfo);
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            }
            $scope.setItemInfoSelected = function () {
                $log.debug("SELECTED itemInfo's itemDetailId:",$scope.selectedItemInfo.detailId);
                //drill down the item detail for select.
                ItemInfoService.get({id:$scope.selectedItemInfo.detailId}, function (response) {
                    $log.debug("ItemInfoService.get(one) success!", response.data);
                    $rootScope.itemInfos = response.data;
                    //Select binding
                    $scope.selectedItemInfo= $rootScope.itemInfos[0];//Default 0ne.
                    $log.debug("selectedItemInfo:",$scope.selectedItemInfo);
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            }
            //
            $log.info("ConsultCtrl initialize...");
            $scope.loadUserAndItemInfos();
            $scope.loadInsAndPres();
        })
    