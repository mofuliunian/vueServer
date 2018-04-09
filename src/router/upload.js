import express from 'express';
import formidable from 'formidable'
import fs from 'fs'

const router = express.Router();

router.post('/api/upload', (req, res) => {
  // 新建一个form的处理流
  const form = new formidable.IncomingForm()
  // 处理的是utf-8
  form.encoding = 'utf-8';
  // 保存的地方
  const url = "/Users/moran/Desktop/project/vueServer/public/";
  form.uploadDir = url;
  form.keepExtensions = true;  // 保留文件后缀
  form.maxFieldsSize = 4 * 1024 * 1024; // 文件大小
  form.parse(req, (err, fields, files) => {
    if (files) {
      let {path, name} = files.file;
      let rePath = url + name;
      fs.rename(path, rePath, (err) => {
        if(err){
          throw Error(err)
        }else{
          res.json({
            code: 1,
            msg: '上传成功',
            imgUrl: `http://localhost:8083/public/${name}`
          })
        }
      })
    }
  });
});

export default router