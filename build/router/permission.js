'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('../model/login');

var _tools = require('../config/tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/permission', function (req, res) {
    var token = req.headers.token;

    var ids = (0, _tools.getDecipher)(token);
    (0, _login.getPermission)(ids, function (data) {
        if (data.code) {
            var datas = JSON.parse(data.permission);
            res.json({
                code: 1,
                meg: '权限获取成功',
                permission: datas
            });
        } else {
            res.json({
                code: 0,
                meg: '权限获取失败'
            });
        }
    });
});

exports.default = router;
//# sourceMappingURL=permission.js.map