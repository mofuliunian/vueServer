'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = exports.getDecipher = exports.getCipher = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exceed = 7200;

var getCipher = function getCipher(str) {
  var cipher = _crypto2.default.createCipher('aes256', 'admin');
  var enc = cipher.update(str, 'utf-8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

var getDecipher = function getDecipher(str) {
  var decipher = _crypto2.default.createDecipher('aes256', 'admin');
  var crypted = decipher.update(str, 'hex', 'utf-8');
  crypted += decipher.final('utf-8');
  return crypted;
};

var authentication = function authentication(req, res, next) {
  console.log(req.headers.token);
  if (req.headers.token === '' || req.url === '/login') {
    var firstTime = ~~(new Date().getTime() / 1000);
    req.headers.token = getCipher(req.body.userName + '&' + firstTime);
    next();
  } else {
    var nowTime = ~~(new Date().getTime() / 1000);
    var reg = new RegExp('"', "g");
    console.log(req.headers.token);
    req.headers.token = req.headers.token.replace(reg, "");
    var time = getDecipher(req.headers.token).split('&')[1];
    if (nowTime - time >= exceed) {
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