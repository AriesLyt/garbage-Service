const { DataTypes } = require('sequelize')

const seq = require('../db')

//showshowway
const PicTwoModel = seq.define('PicTwoData', {
  pic_url: {
    type: DataTypes.CHAR(128),
    allowNull: false,
    unique: false,
    comment: '图片链接'
  }
})

// PicTwoModel.sync({force: true})

module.exports = PicTwoModel