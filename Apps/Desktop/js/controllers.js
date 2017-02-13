angular.module('app.controllers', [])
  
.controller('page3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.drag = function(value) {
        $scope.years = Math.floor(value / 12);
        if(value<=30){
            $scope.yearsR = "青年";
        }else if(value>=60){
            $scope.yearsR = "老年";
        }else {
            $scope.yearsR = "中年";
        }
    };

    $scope.rangeValue = 0;

}])
   
.controller('page4Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
    