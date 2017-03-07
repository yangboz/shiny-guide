angular.module('app.services', ['ngResource'])
//DiagnosisService
    .factory('DiagnosisService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "diagnosis/user/:id"
        )
        return data;
    })
//RecommendItemService
    .factory('RecommendItemService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "recommend/item/:id"
        )
        return data;
    })
//RecommendUserService
    .factory('RecommendUserService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "recommend/user/:id"
        )
        return data;
    })
//ItemDetailService
    .factory('ItemDetailService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "item/detail/:id"
        )
        return data;
    })
//ItemInfoService
    .factory('ItemInfoService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "item/info/:id"
        )
        return data;
    })
//UpdateItemInfoService
.factory('UpdateItemInfoService', function ($resource,CONFIG_ENV) {
    var data = $resource(CONFIG_ENV.api_endpoint + 'item/info/:Id/detail/:dId', {Id: "@Id",dId:"@dId"}, {
        update: {method: 'PUT', params: {Id: "@Id",dId:"@dId"}}
    });
    return data;
})
//UserInfoService
.factory('UserInfoService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "user/:id"
        )
        return data;
})
//UpdateUserInfoService
    .factory('UpdateUserInfoService', function ($resource,CONFIG_ENV) {
        var data = $resource(CONFIG_ENV.api_endpoint + 'user/:Id/cid/:cId', {Id: "@Id",cId:"@cId"}, {
            update: {method: 'PUT', params: {Id: "@Id",cId:"@cId"}}
        });
        return data;
    })
//PrescriptionService
    .factory('PrescriptionService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "prescription"
        )
        return data;
    })
    //InstructionService
    .factory('InstructionService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "instruction"
        )
        return data;
    })
    //ConsultInfoService
    .factory('ConsultInfoService', function ($resource,CONFIG_ENV) {
        var data = $resource(
            CONFIG_ENV.api_endpoint  + "consult"
        )
        return data;
    })
///@see: http://forum.ionicframework.com/t/ionicloading-in-http-interceptor/4599/7
    .factory('TrendicityInterceptor',
        function ($injector, $q, $log) {

            var hideLoadingModalIfNecessary = function () {
                var $http = $http || $injector.get('$http');
                if ($http.pendingRequests.length === 0) {
                    $injector.get('$ionicLoading').hide();
                }
            };

            return {
                request: function (config) {
                    $injector.get('$ionicLoading').show();

                    // Handle adding the access_token or auth request.

                    return config;
                },
                requestError: function (rejection) {
                    hideLoadingModalIfNecessary();
                    return $q.reject(rejection);
                },
                response: function (response) {
                    hideLoadingModalIfNecessary();
                    return response;
                },
                responseError: function (rejection) {
                    hideLoadingModalIfNecessary();
                    //http status code check
                    $log.error("detected what appears to be an oAuth error...", rejection);
                    if (rejection.status == 400) {
                        rejection.status = 401; // Set the status to 401 so that angular-http-auth inteceptor will handle it
                    }
                    return $q.reject(rejection);
                }
            };
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