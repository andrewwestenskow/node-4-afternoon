const swag = require('./../models/swag')

module.exports = {
  search(req, res, next) {
    const {category} = req.query
    let found = swag.some(item => item.category === category)
    if(found) {
      let filter = swag.filter(item => item.category === category)
      res.status(200).send(filter)
    } else {
      res.status(200).send(swag)
    }
  }
}