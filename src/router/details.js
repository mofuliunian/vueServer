import express from 'express';
import { details } from "../model/login";
import {userLogin} from '../model/login'
// 表格的操作
import xlsx from 'node-xlsx';
// 反向代理
import httpProxy from 'http-proxy'
const fs = require('fs');

const proxy = httpProxy.createProxyServer({});

const router = express.Router();

var obj = xlsx.parse(process.cwd() + '/public/text.xlsx');//配置excel文件的路径
var excelObj=obj[0].data;//excelObj是excel文件里第一个sheet文档的数据，obj[i].data表示excel文件第i+1个sheet文档的全部内容
console.log(excelObj);
var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}
console.log(data, 'data')
var buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }        
]);

//将文件内容插入新的文件中
fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

router.get('/details', (req, res) => {
    res.download('test1.xlsx')

    proxy.web(req, res, { target: 'http://localhost:8081/api/users' }); 

    // const query = req.query;
    // details(query, (data) => {
    //     res.json(data);
    // })
});

export default router