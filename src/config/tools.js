import crypto from 'crypto';

const exceed = 7200;

const getCipher = (str) => {
  const cipher = crypto.createCipher('aes256', 'admin');
  let enc = cipher.update(str, 'utf-8', 'hex');
  enc += cipher.final('hex');
  return enc
};

const getDecipher = (str) => {
  const decipher = crypto.createDecipher('aes256', 'admin');
  let crypted = decipher.update(str, 'hex', 'utf-8');
  crypted += decipher.final('utf-8');
  return crypted;
};

const authentication = (req, res, next) => {
  console.log(req.headers.token);
  if (req.headers.token === '' || req.url === '/login') {
    const firstTime = ~~(new Date().getTime() / 1000);
    req.headers.token = getCipher(`${req.body.userName}&${firstTime}`);
    next()
  } else {
    const nowTime = ~~(new Date().getTime() / 1000);
    const reg = new RegExp('"',"g");
    console.log(req.headers.token);
    req.headers.token = req.headers.token.replace(reg,"");
    const time = getDecipher(req.headers.token).split('&')[1];
    if (nowTime - time >= exceed) {
      res.json({
        code: 0,
        msg: '鉴权失效请重新登陆',
        redirect: '/api/login'
      })
    } else {
      next()
    }
  }
};

export {
  getCipher,
  getDecipher,
  authentication
}