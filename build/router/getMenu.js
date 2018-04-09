'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tools = require('../config/tools');

var _login = require('../model/login');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/getMenu', function (req, res) {
  var username = (0, _tools.getDecipher)(req.headers.token).split('&')[0];
  (0, _login.navMenu)(username, function (data) {
    res.json(data);
  });
});

exports.default = router;
//# sourceMappingURL=getMenu.js.map