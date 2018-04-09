import mysql from 'mysql';
import listData from '../../mock/listData.json'

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'dcxt',
  insecureAuth: true
});

connection.connect(err => {
  if (err) {
    throw err;
  }
});

const userLogin = (info, cb) => {
  connection.query('select * from user where userName=?', [info.userName], (err, result) => {
    if (result.length !== 0) {
      if (result[0].password === info.password) {
        cb({
          code: 1,
          personage: result[0],
          msg: '登陆成功',
        })
      } else {
        cb({
          code: 0,
          msg: '密码错误'
        })
      }
    } else {
      cb({
        code: 2,
        msg: '用户名不存在请注册'
      })
    }
  })
};

const Logon = (info, cb) => {
  connection.query('select * from user where userName=?', [info.nickname], (err, result) => {
    if (result.length === 0) {
      connection.query(`insert into user (userName,password,email,phone) values (?,?,?,?)`, [info.nickname, info.password, info.email, info.phone], (err, result) => {
        cb({
          code: 1,
          msg: '注册成功'
        })
      })
    } else {
      cb({
        code: 0,
        msg: '用户名重复请重新注册'
      })
    }
  });
};

const navMenu = (info, cb) => {
  connection.query('select * from user where userName=?', [info], (err, result) => {
    if (result.length !== 0) {
      cb({
        code: 1,
        personage: result[0],
        msg: '获取成功',
      })
    } else {
      cb({
        code: 0,
        msg: '获取失败'
      })
    }
  })
};

const details = (payload, cb) => {
  cb({
    uid: payload.uid,
    name: payload.name,
    listData
  })
};

export {
  userLogin,
  Logon,
  details,
  navMenu
}
