var DynamicEnvironment = DynamicEnvironment || {};
//Helper functions here.
/**
 * You can have as many environments as you like in here
 * just make sure the host matches up to your hostname including port
 */
var _environment;
var _environments = {
    local: {
        host: 'localhost:8080',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://localhost:8080/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
            ,'MQTT_host':'192.168.2.7'
            ,'MQTT_port':9001
            ,'sCameraIds':{Id:1,Ids:"2,8,9"}
        }
    },
    dev: {
        host: 'http://192.168.2.7',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://192.168.2.7:8083/api/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
            ,'MQTT_host':'192.168.2.7'
            ,'MQTT_port':9001
            ,'sCameraIds':{Id:1,Ids:"2,8,9"}
        }
    },
    test: {
        host: 'http://test.com',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://test.com:9022/api/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
            ,'MQTT_host':'test.com'
            ,'MQTT_port':9001
            ,'sCameraIds':{Id:1,Ids:"2,8,9"}
        }
    }
};
_getEnvironment = function () {
    var host = window.location.host;
    //console.log("host:"+host);
    if (_environment) {
        return _environment;
    }

    for (var environment in _environments) {
        if (typeof _environments[environment].host && _environments[environment].host == host) {
            _environment = environment;
            return _environment;
        }
    }

    return "local";//default
};
DynamicEnvironment.get = function (property) {
    var result = _environments[_getEnvironment()].config[property];
    //var result = _environments["test"].config[property];
    console.log("DynamicEnvironment.get():",result);
    return result;
};
