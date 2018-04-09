'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = require('../router/login');

var _login2 = _interopRequireDefault(_login);

var _getMenu = require('../router/getMenu');

var _getMenu2 = _interopRequireDefault(_getMenu);

var _getOrder = require('../router/getOrder');

var _getOrder2 = _interopRequireDefault(_getOrder);

var _upload = require('../router/upload');

var _upload2 = _interopRequireDefault(_upload);

var _details = require('../router/details');

var _details2 = _interopRequireDefault(_details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.post('/api/login', _login2.default);
  app.get('/api/getMenu', _getMenu2.default);
  app.get('/api/getOrder', _getOrder2.default);
  app.get('/details', _details2.default);
  app.post('/api/upload', _upload2.default);
};
//# sourceMappingURL=index.js.map