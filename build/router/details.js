'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('../model/login');

var _nodeXlsx = require('node-xlsx');

var _nodeXlsx2 = _interopRequireDefault(_nodeXlsx);

var _httpProxy = require('http-proxy');

var _httpProxy2 = _interopRequireDefault(_httpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 表格的操作
var fs = require('fs');
// 反向代理


var proxy = _httpProxy2.default.createProxyServer({});

var router = _express2.default.Router();

var obj = _nodeXlsx2.default.parse(process.cwd() + '/public/text.xlsx'); //配置excel文件的路径
var excelObj = obj[0].data; //excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
console.log(excelObj);
var data = [];
for (var i in excelObj) {
    var arr = [];
    var value = excelObj[i];
    for (var j in value) {
        arr.push(value[j]);
    }
    data.push(arr);
}
console.log(data, 'data');
var buffer = _nodeXlsx2.default.build([{
    name: 'sheet1',
    data: data
}]);

//将文件内容插入新的文件中
fs.writeFileSync('test1.xlsx', buffer, { 'flag': 'w' });

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

router.get('/details', function (req, res) {
    res.download('test1.xlsx');

    proxy.web(req, res, { target: 'http://localhost:8081/api/users' });

    // const query = req.query;
    // details(query, (data) => {
    //     res.json(data);
    // })
});

exports.default = router;
//# sourceMappingURL=details.js.map