const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')();
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');
const app = new Koa();

// app.use(cors())

const FILE_PATH = path.join(__dirname, "/assets/uploadPic")
console.log(FILE_PATH);

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

function getImageType(str){
  var reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return str.match(reg)[1];
}

const urlArr = []

router.post('/pic', ctx => {
  // console.log(ctx.request.files.file);
  const file = ctx.request.files.file
  const format = file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
  const reader = fs.createReadStream(file.filepath)
  // console.log(reader)
  const stream = fs.createWriteStream(path.join(FILE_PATH, `${Date.now()}${file.newFilename}`))
  reader.pipe(stream)
  console.log('uploading %s -> %s', file.name, stream.path)
  console.log('http://192.168.14.55:10086' + stream.path.toString().split("assets")[1])

  // ctx.redirect(stream.path.substr(6).replace(/\\/g,'/'))
  // const blob = new Blob
  let url = 'http://192.168.14.55:10086' + stream.path.toString().split('assets')[1].replace('/\\/g', '/')
  urlArr.push(url)
  ctx.body = url
})

router.post('/sub', ctx => {
  const { name } = ctx.request.body
  if(name === 'cancel'){
    let a = '未定义'
    ctx.body = { a, urlArr }
    return 
  }
  let a = name
  ctx.body = { a, urlArr }
})

app.use(require('koa-static')(__dirname + '/assets'))

app.use(router.routes(), router.allowedMethods());

app.listen(10086);