const { DataTypes } = require('sequelize')

const seq = require('../db')

//showshowway
const PicOneModel = seq.define('piconedata', {
  pic_url: {
    type: DataTypes.CHAR(128),
    allowNull: false,
    unique: false,
    comment: '图片链接'
  }
})

// PicOneModel.sync({force: true})

module.exports = PicOneModel