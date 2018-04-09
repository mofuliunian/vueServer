'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/account', function (req, res) {
  var query = req.query;
  res.json({
    code: 1
  });
});

exports.default = router;
//# sourceMappingURL=account.js.map