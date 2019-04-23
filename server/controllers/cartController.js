const swag = require('./../models/swag')

module.exports = {
  add(req,res,next) {
    const {id} = req.params
    if(req.session.user.cart.some(item => item.id === +id)){
      res.status(200).send(req.session.user)
    } else {
      const product = swag.find(item => item.id === +id)
      req.session.user.cart.push(product)
      req.session.user.total += product.price
      res.status(200).send(req.session.user)
    }
  },

  delete(req, res, next) {
    const {id} = req.params
    let index = req.session.user.cart.findIndex(item => item.id === +id)
    req.session.user.total -= req.session.user.cart[index].price
    req.session.user.cart.splice(index, 1)
    res.status(200).send(req.session.user)
  },

  checkout(req, res, send) {
    req.session.user.cart = []
    req.session.user.total = 0
    res.status(200).send(req.session.user)
  }
}