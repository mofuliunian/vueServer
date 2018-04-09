'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('../model/login');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/api/login', function (req, res) {
  var body = req.body;
  (0, _login.userLogin)(body, function (code) {
    code.token = req.headers.token;
    res.json(code);
  });
});

exports.default = router;
//# sourceMappingURL=login.js.map