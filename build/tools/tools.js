'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authentication = exports.getDecipher = exports.getCipher = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exceed = 7200;
var firstTime = 0;

var getCipher = function getCipher(str) {
    var cipher = _crypto2.default.createCipher('aes192', 'admin');
    var enc = cipher.update(str, 'utf-8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

var getDecipher = function getDecipher(str) {
    var deCipher = _crypto2.default.createDecipher('aes192', 'admin');
    var deenc = deCipher.update(str, 'hex', 'utf-8');
    deenc += deCipher.final('utf-8');
    return deenc;
};

var authentication = function authentication(req, res, next) {
    if (req.headers.token === '' && req.url === '/login') {
        firstTime = ~~(new Date().getTime() / 1000);
        req.headers.token = getCipher(req.body.userName);
        next();
    } else {
        var nowTime = ~~(new Date().getTime() / 1000);
        if (nowTime - firstTime >= exceed) {
            res.json({
                code: 0,
                msg: '鉴权失效请重新登陆',
                redirect: '/api/login'
            });
        } else {
            next();
        }
    }
};

exports.getCipher = getCipher;
exports.getDecipher = getDecipher;
exports.authentication = authentication;
//# sourceMappingURL=tools.js.map