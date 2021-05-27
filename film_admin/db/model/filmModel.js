const filmSchema = require('../schema/filmSchema')
const BaseModel = require('./baseModel')

class FilmModel extends BaseModel {

  constructor() {
    super('Film', filmSchema)
  }
}

module.exports = new FilmModel;
