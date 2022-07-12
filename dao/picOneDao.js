const PicOneModel = require("../model/picOneModel");
const { Op } = require('sequelize');

class PicOneDao {
  constructor(){

  }

  async createPicOne (pic_url) {
    const res = await PicOneModel.create({ pic_url })
    return res
  }

  async selectPicOne () {
    const res = await PicOneModel.findAll()
    return res
  }
}

module.exports = new PicOneDao()