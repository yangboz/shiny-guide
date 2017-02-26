angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])




//ItemInfoService
.factory('ItemInfoService', function ($resource, CONFIG_ENV) {
    var data = $resource(
        CONFIG_ENV.api_endpoint + "item/:Id/detailId/:dId",
        {Id: "@Id",dId:"@dId"},
        {
            "update": {method: "PUT"}
        })
    return data;
})
//UserInfoService
    .factory('UserInfoService', function ($resource, CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint + "user"
        )
        return data;
    })
//LoaderService
.factory('LoaderService', function($rootScope, $ionicLoading) {
    return {
        show : function() {

            $rootScope.loading = $ionicLoading.show({

                // The text to display in the loading indicator
                content: '<ion-spinner icon="ios"></ion-spinner>',

                // The animation to use
                animation: 'fade-in',

                // Will a dark overlay or backdrop cover the entire view
                showBackdrop: true,

                // The maximum width of the loading indicator
                // Text will be wrapped if longer than maxWidth
                maxWidth: 200,

                // The delay in showing the indicator
                showDelay: 10
            });
        },

        hide : function(){
            $ionicLoading.hide();
        }
    }
});