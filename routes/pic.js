const router = require('koa-router')()

//func
const { uploadPic, finallyPic, selectPic } = require('../controllers/picController')


//upload pic
router.post("/pic", uploadPic)

// save pic in sql
router.post("/sub", finallyPic)

router.post("/spic", selectPic)

module.exports = router