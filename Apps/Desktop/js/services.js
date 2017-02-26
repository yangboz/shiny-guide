angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])




//ItemInfoService
.factory('ItemInfoService', function ($resource,CONFIG_ENV) {
    var data = $resource(CONFIG_ENV.api_endpoint + 'item/:Id/detail/:dId', {Id: "@Id",dId:"@dId"}, {
        update: {method: 'PUT', params: {Id: "@Id",dId:"@dId"}}
    });
    return data;
})
//UserInfoService
.factory('UserInfoService', function ($resource) {
        var data = $resource(
            'http://localhost:8080/td/' + "user"
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
})
//@see http://stackoverflow.com/questions/16627860/angular-js-and-ng-swith-when-emulating-enum
.factory('Enum', [function () {
    var service = {
        //
        genderType: [
            //male:
            {
                name: "男",
                data: "1"
            },
            //felmale:
            {
                name: "女",
                data: "0"
            }
        ]
        , getUUID: function () {
            // http://www.ietf.org/rfc/rfc4122.txt
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        }
        , getTimestamp: function () {
            var now = new Date;
            var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
                now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
            return utc_timestamp;
        }
    };
    return service;
}]);