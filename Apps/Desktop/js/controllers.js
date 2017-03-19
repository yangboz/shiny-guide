// angular.module('app.controllers', ['ngFileUpload','pubnub.angular.service'])
angular.module('app.controllers', ['app.services','ngFileUpload'])
    .controller('MainCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$ionicModal,$log,$ionicPopup) {
           $log.info("MainCtrl...");
            //root scope variables for modal.
            $rootScope.consultingModal = null;
            $rootScope.userInfos = [];
            $rootScope.instructions = [];
            $rootScope.pescriptions = [];
            $rootScope.consultInfofull = {eInstruction:{},mPrescription:{}};
            //selected
            $rootScope.unconsultUserInfos = [];
            $rootScope.selectedUserInfo = {};
            $rootScope.selectedItemInfo = {};
            $rootScope.selectedItemDetail = {};
            //ConsultModal
            $ionicModal.fromTemplateUrl('templates/modal-consulting.html', {
                scope: $scope,
                backdropClickToClose: false
            }).then(function (modal) {
//        console.log("modal-login.html init!!!");
                $rootScope.consultingModal = modal;
                //
            });
            $rootScope.consultingAutoModal = null;
            $ionicModal.fromTemplateUrl('templates/modal-consulting-auto.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.consultingAutoModal = modal;
            });
            $rootScope.consultingStaticModal = null;
            $ionicModal.fromTemplateUrl('templates/modal-consulting-static.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.consultingStaticModal = modal;
            });
            //NewInstructionModal
            $rootScope.newInstructionModal = null;
            $ionicModal.fromTemplateUrl('templates/modal-instruction-new.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.newInstructionModal = modal;
                // console.log(" $rootScope.newInstructionModal:"+ $rootScope.newInstructionModal);
            });
            //PrescriptionModal
            $rootScope.newPrescriptionModal = null;
            $ionicModal.fromTemplateUrl('templates/modal-prescription-new.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $rootScope.newPrescriptionModal = modal;
                // console.log(" $rootScope.newPrescriptionModal:"+ $rootScope.newPrescriptionModal);
            });
            // A Simple alert
            $rootScope.showAlert = function($msg) {
                var alertPopup = $ionicPopup.alert({
                    title: $msg
                    // template: 'It might taste good'
                });

                alertPopup.then(function (res) {
                    // console.log('Thank you for not eating my delicious ice cream cone');
                });
            }

            // A confirm dialog
            $rootScope.showPrompt = function($title) {
                var confirmPopup = $ionicPopup.confirm({
                    title: $title,
                    template: '立即问诊?',
                    buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
                        text: '取消',
                        type: 'button-default',
                        onTap: function(e) {
                            // e.preventDefault() will stop the popup from closing when tapped.
                            // e.preventDefault();
                        }
                    }, {
                        text: '确定',
                        type: 'button-positive',
                        onTap: function(e) {
                            // Returning a value will cause the promise to resolve with the given value.
                            $rootScope.getDiagnosis();
                            //
                            return null;
                        }
                    }]
                });

                confirmPopup.then(function(res) {
                    if(res) {
                        // console.log('You are sure');
                    } else {
                        // console.log('You are not sure');

                    }
                })
            };
        })
//
.controller('page3Ctrl', function ($rootScope,$scope,$stateParams,$ionicModal,CONFIG_ENV,Upload,$ionicLoading,$log,
                                   UpdateItemInfoService,UserInfoService,Enum,$timeout,
                                   RecommendUserService,RecommendItemService,DiagnosisService) {
//
// //PubNub
//     Pubnub.init({
//         publishKey: CONFIG_ENV.pubnub_key,
//         subscribeKey: CONFIG_ENV.pubnub_secret
//     });
    $log.info("CONFIG_ENV:",CONFIG_ENV);
    //ng-model
    $scope.userInfo = {id:Enum.getUUID(),name:"", gender:1,age:50, itemId: "",itemDetailId:""};
    $log.info("default userInfo:",$scope.userInfo);
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

        $scope.savedUserID = 0;
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
                $log.info("createUserInfo("+$scope.savedUserID+") success, response:", resp);
                $scope.savedUserID = resp.data.id;
                // $rootScope.showPrompt("采集成功!");
                $rootScope.showAlert("采集成功!");
               //Auto diagnosis testing

            }, function (resp) {
                $log.error('Error status: ' + resp.status);
            });
        }
        $rootScope.getDiagnosis = function(){
             DiagnosisService.get({id:$scope.savedUserID}, function (response) {
                 $log.debug("DiagnosisService.get("+$scope.savedUserID+") success!", response);
                 //
                 $rootScope.consultInfofull = response;
                 //
                 $rootScope.consultingAutoModal.show();
             }, function (error) {
                 // failure handler
                 $log.error("DiagnosisService.get() failed:", JSON.stringify(error));
             });
        }
})

    .controller('page4Ctrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$log,Enum,ConsultUserInfoService,ItemInfoService,UserInfoService,ItemDetailService) {
            $scope.userInfos = [
                {
                    id:Enum.getUUID(),name:"", gender:1,age:50, itemId: "",itemDetailId:""
                }
            ];
            //Select binding
            $scope.selectedUserInfo = $rootScope.userInfos[0];//Default 0ne.

            //GET where none consulting.
            $scope.loadUserInfos = function () {

                ConsultUserInfoService.get({"id":-1}, function (response) {
                    $log.info("ConsultUserInfoService.get() success!", response.data);
                    $scope.userInfos = response.data;
                    //
                    $rootScope.unconsultUserInfos =  response.data;
                }, function (error) {
                    // failure handler
                    $log.error("UserInfoService.get() failed:", JSON.stringify(error));
                });

            };

            $scope.loadItemDetailOne = function () {

                //drill down the item detail for select.
                ItemDetailService.get({id:$rootScope.selectedItemInfo.detailId}, function (response) {
                    $log.debug("ItemDetailService.get("+$rootScope.selectedItemInfo.detailId+") success!", response.data);
                    $rootScope.selectedItemDetail = response.data;
                    $log.debug(" $rootScope.selectedItemDetail:",  $rootScope.selectedItemDetail);
                }, function (error) {
                    // failure handler
                    $log.error("ItemDetailService.get() failed:", JSON.stringify(error));
                });
            }

            $scope.getUserItemInfo = function(userInfo){
               //
                $rootScope.selectedUserInfo = userInfo;
                ItemInfoService.get({id:userInfo.id}, function (response) {
                    $log.debug("ItemInfoService.get("+userInfo.id+") success!", response.data);
                    $rootScope.selectedItemInfo = response.data;
                    //Select binding
                    $log.debug("$rootScope.selectedItemInfo:",$rootScope.selectedItemInfo);
                    //
                    $rootScope.consultingStaticModal.show();
                    //item related detail
                    $scope.loadItemDetailOne();
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            }

            $scope.deleteUserInfo = function (userInfo) {
                UserInfoService.delete({id:userInfo.id}, function (response) {
                    $log.info("UserInfoService.delete() success!", response.data);
                   //refresh
                    $scope.loadUserInfos();
                }, function (error) {
                    // failure handler
                    $log.error("UserInfoService.get() failed:", JSON.stringify(error));
                });
            }

            //default behaviors
            console.log("loadUnConsultUsers...");
            $scope.loadUserInfos();


        })
   
.controller('ConsultingAutoCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams,$ionicModal,$log) {
    $log.info("ConsultingAutoCtrl init...");
})
    .controller('ConsultingCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$log,$ionicModal,
                  UserInfoService,ItemInfoService,ItemDetailService,
                  InstructionService,PrescriptionService,
                  ConsultInfoService,UpdateUserInfoService,ConsultUserInfoService) {
        //
            //Select binding
            $scope.selectedUserInfo = null;
            $scope.selectedItemInfo= null;
            $scope.selectedInstruction = null;
            $scope.selectedPrescription = null;
            //GET where none consulting.
            $scope.loadUserInfos = function () {

                // UserInfoService.get({}, function (response) {
                //     $log.info("UserInfoService.get() success!", response.data);
                //     $rootScope.userInfos = response.data;
                //     //Select binding
                //     $scope.selectedUserInfo = $rootScope.userInfos[0];//Default 0ne.
                //     $log.debug("selectedUserInfo:",$scope.selectedUserInfo);
                // }, function (error) {
                //     // failure handler
                //     $log.error("UserInfoService.get() failed:", JSON.stringify(error));
                // });
                //
                ConsultUserInfoService.get({"id":-1}, function (response) {
                    $log.info("ConsultUserInfoService.get() success!", response.data);
                    $rootScope.userInfos = response.data;
                    //Select binding
                    $scope.selectedUserInfo = $rootScope.userInfos[0];//Default 0ne.
                    $log.debug("selectedUserInfo:",$scope.selectedUserInfo);
                    //default trigger.
                    $scope.setUserInfoSelected($scope.selectedUserInfo);
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
                    //reload
                    // $scope.loadUserAndItemInfos();
                    //hide consulting modal.
                    $rootScope.consultingStaticModal.hide();
                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            };
            //
            $scope.loadItemDetailOne = function () {
                $log.debug("SELECTED itemInfo's itemDetailId:",$scope.selectedItemInfo.detailId);
                //drill down the item detail for select.
                ItemDetailService.get({id:$scope.selectedItemInfo.detailId}, function (response) {
                    $log.debug("ItemDetailService.get(one) success!", response.data);
                    $scope.itemDetail = response.data;
                }, function (error) {
                    // failure handler
                    $log.error("ItemInfoService.get() failed:", JSON.stringify(error));
                });
            }
            //SELECT change
            $scope.setUserInfoSelected = function ($selected) {
                $scope.selectedUserInfo = $selected;//refresh.
                $log.debug("SELECTED userInfo:",$scope.selectedUserInfo);
                //drill down the item info for select.
                ItemInfoService.get({id:$selected.itemId}, function (response) {
                    $log.debug("ItemInfoService.get(",$selected.itemId,") success!", response.data);
                    //
                    $scope.selectedItemInfo = response.data;
                   //
                    $scope.loadItemDetailOne();
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
    .controller('NewInstructionCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$ionicModal,InstructionService,$log) {
            $scope.newInstruction = {name:null,content:null};
            //CREATE,
            $scope.createInstruction = function () {
                //
                var anewInstruction = new InstructionService();
                anewInstruction.name = $scope.newInstruction.name;
                anewInstruction.content = $scope.newInstruction.content;
                //Save
                anewInstruction.$save(function (resp) {
                    $log.info("createInstruction success, response:", resp);
                    $scope.savedUserID = resp.data.id;
                    //reload
                    InstructionService.get({}, function (response) {
                        $log.debug("InstructionService.reload success!", response);
                        //close popup.
                        $rootScope.newInstructionModal.hide();
                    }, function (error) {
                        // failure handler
                        $log.error("InstructionService.get() failed:", JSON.stringify(error));
                    });

                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            }
        })
    .controller('NewPrescriptionCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope,$scope, $stateParams,$ionicModal,PrescriptionService,$log) {
        $scope.newPrescription = {name:null,content:null};
            //CREATE,
            $scope.createPrescription = function () {
                //
                var anewPrescription = new PrescriptionService();
                anewPrescription.name = $scope.newPrescription.name;
                anewPrescription.content = $scope.newPrescription.content;
                //Save
                anewPrescription.$save(function (resp) {
                    $log.info("createPrescription success, response:", resp);
                    $scope.savedUserID = resp.data.id;
                    //reload
                    PrescriptionService.get({}, function (response) {
                        $log.debug("PrescriptionService.reload success!", response);
                        //close popup.
                        $rootScope.newPrescriptionModal.hide();
                    }, function (error) {
                        // failure handler
                        $log.error("PrescriptionService.get() failed:", JSON.stringify(error));
                    });

                }, function (resp) {
                    $log.error('Error status: ' + resp.status);
                });
            }
        })