'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navMenu = exports.details = exports.Logon = exports.userLogin = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _listData = require('../../mock/listData.json');

var _listData2 = _interopRequireDefault(_listData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mysql2.default.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'dcxt',
  insecureAuth: true
});

connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

var userLogin = function userLogin(info, cb) {
  connection.query('select * from user where userName=?', [info.userName], function (err, result) {
    if (result.length !== 0) {
      if (result[0].password === info.password) {
        cb({
          code: 1,
          personage: result[0],
          msg: '登陆成功'
        });
      } else {
        cb({
          code: 0,
          msg: '密码错误'
        });
      }
    } else {
      cb({
        code: 2,
        msg: '用户名不存在请注册'
      });
    }
  });
};

var Logon = function Logon(info, cb) {
  connection.query('select * from user where userName=?', [info.nickname], function (err, result) {
    if (result.length === 0) {
      connection.query('insert into user (userName,password,email,phone) values (?,?,?,?)', [info.nickname, info.password, info.email, info.phone], function (err, result) {
        cb({
          code: 1,
          msg: '注册成功'
        });
      });
    } else {
      cb({
        code: 0,
        msg: '用户名重复请重新注册'
      });
    }
  });
};

var navMenu = function navMenu(info, cb) {
  connection.query('select * from user where userName=?', [info], function (err, result) {
    if (result.length !== 0) {
      cb({
        code: 1,
        personage: result[0],
        msg: '获取成功'
      });
    } else {
      cb({
        code: 0,
        msg: '获取失败'
      });
    }
  });
};

var details = function details(payload, cb) {
  cb({
    uid: payload.uid,
    name: payload.name,
    listData: _listData2.default
  });
};

exports.userLogin = userLogin;
exports.Logon = Logon;
exports.details = details;
exports.navMenu = navMenu;
//# sourceMappingURL=login.js.map