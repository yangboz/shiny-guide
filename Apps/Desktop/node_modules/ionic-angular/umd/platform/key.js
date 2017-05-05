(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (Key) {
        Key[Key["LEFT"] = 37] = "LEFT";
        Key[Key["UP"] = 38] = "UP";
        Key[Key["RIGHT"] = 39] = "RIGHT";
        Key[Key["DOWN"] = 40] = "DOWN";
        Key[Key["ENTER"] = 13] = "ENTER";
        Key[Key["ESCAPE"] = 27] = "ESCAPE";
        Key[Key["SPACE"] = 32] = "SPACE";
        Key[Key["TAB"] = 9] = "TAB";
    })(exports.Key || (exports.Key = {}));
    var Key = exports.Key;
});
//# sourceMappingURL=key.js.map