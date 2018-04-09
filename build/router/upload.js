'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/api/upload', function (req, res) {
  var form = new _formidable2.default.IncomingForm();
  form.encoding = 'utf-8';
  var url = "/Users/moran/Desktop/project/vueServer/public/";
  form.uploadDir = url;
  form.keepExtensions = true; // 保留文件后缀
  form.maxFieldsSize = 4 * 1024 * 1024; // 文件大小
  form.parse(req, function (err, fields, files) {
    if (files) {
      var _files$file = files.file,
          path = _files$file.path,
          name = _files$file.name;

      var rePath = url + name;
      _fs2.default.rename(path, rePath, function (err) {
        if (err) {
          throw Error(err);
        } else {
          res.json({
            code: 1,
            msg: '上传成功',
            imgUrl: 'http://localhost:8083/public/' + name
          });
        }
      });
    }
  });
});

exports.default = router;
//# sourceMappingURL=upload.js.map