const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')();
const koaBody = require('koa-body');
const path = require('path');
const app = new Koa();

//route
const pic = require('./routes/pic')

// app.use(cors())

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    // uploadDir: `${FILE_PATH}`,
    // onFileBegin: (name, file)=>{
    //   const fileFormat = file.originalFilename.split('.');
    //   file.name = `${Date.now()}.${fileFormat[fileFormat.length-1]}`
    //   file.path = `${FILE_PATH}`;
    //   console.log(name, file);
    // }
  }
}));

//router
app.use(pic.routes())




app.use(require('koa-static')(__dirname + '/assets'))

app.use(router.routes(), router.allowedMethods());

app.listen(10086);