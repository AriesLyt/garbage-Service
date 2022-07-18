const PicOneDao = require('../dao/picOneDao')
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, "../assets/uploadPic")

const uploadPic = ctx => {
  const file = ctx.request.files.file
  const format = file.originalFilename.split('.')[file.originalFilename.split('.').length-1]
  const reader = fs.createReadStream(file.filepath)
  const stream = fs.createWriteStream(path.join(FILE_PATH, `${Date.now()}${file.newFilename}.${format}`))
  reader.pipe(stream)
  console.log('uploading %s -> %s', file.name, stream.path)
  console.log('http://192.168.14.55:10086' + stream.path.toString().split("assets")[1])

  let url = 'http://119.45.242.136:10086' + stream.path.toString().split('assets')[1].replace('/\\/g', '/')
  // let url = 'http://119.45.242.136:10086' + stream.path.toString().split('assets')[1].replace('/\\/g', '/')
  ctx.body = url
}

const finallyPic = async(ctx, next) => {
  const { type, url } = ctx.request.body
  console.log(type, url);
  if(type === "1"){
    url.forEach(it => {
      PicOneDao.createPicOne(it)
    });
  }
}

const selectPic = async ctx => {
  const { name } = ctx.request.body
  if(name === "1"){
    const res = await PicOneDao.selectPicOne()
    if(res){
      let picList = res.map((it) => {
        return {
          id: it.id,
          url: it.pic_url
        }
      })
      ctx.body = {
        code: 0, 
        data: picList
      }
    }
  }
}


module.exports = {
  uploadPic,
  finallyPic,
  selectPic
}