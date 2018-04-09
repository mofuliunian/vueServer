'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _order = require('../../mock/order');

var _order2 = _interopRequireDefault(_order);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/getOrder', function (req, res) {
  var _url$parse$query = _url2.default.parse(req.url, true).query,
      page = _url$parse$query.page,
      pageSum = _url$parse$query.pageSum,
      filter = _url$parse$query.filter;

  console.log(pageSum, page, filter);
  var arr = [];
  if (Number(filter)) {
    arr = _order2.default.filter(function (item) {
      return item.orderState === filter * 1;
    });
  } else {
    arr = _order2.default;
  }
  res.json({
    data: arr.slice((page - 1) * pageSum, page * pageSum),
    len: arr.length,
    code: 1
  });
});

exports.default = router;
//# sourceMappingURL=getOrder.js.map