var DynamicEnvironment = DynamicEnvironment || {};
//Helper functions here.
/**
 * You can have as many environments as you like in here
 * just make sure the host matches up to your hostname including port
 */
var _environment;
var _environments = {
    local: {
        host: 'localhost',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://localhost:8080/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
        }
    },
    dev: {
        host: '118.190.3.169',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://118.190.3.169:8080/td/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
        }
    },
    test: {
        host: '118.190.96.120',
        config: {
            /**
             * Add any config properties you want in here for this environment
             */
            api_endpoint_base: 'http://118.190.96.120:8070/td/'
            ,clientId:'clientApp'
            ,clientSecret:'1NDgzZGY1OWViOWRmNjI5ZT'
        }
    }
};
_getEnvironment = function () {
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    // var host = slashes.concat(window.location.hostname);
    var host = window.location.host;
    console.log("host:"+host);
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
