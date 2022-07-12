const { DataTypes } = require('sequelize')

const seq = require('../db')

//showshowway
const PicOhterModel = seq.define('PicOhterData', {
  pic_type: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    unique: false,
    comment: '图片类型'
  },
  pic_url: {
    type: DataTypes.CHAR(128),
    allowNull: false,
    unique: false,
    comment: '图片链接'
  }
})

// PicOhterModel.sync({force: true})

module.exports = PicOhterModel