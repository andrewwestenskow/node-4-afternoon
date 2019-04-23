const users = require('./../models/users')
let id = 1

module.exports = {
  login (req, res, next){
    let name
    const {username, password} = req.body
    for(i=0; i<users.length; i++){
      if(username === users[i].username && password === users[i].password){
        name = username
        break
      }
    }
    if(name){
      req.session.user.username = name
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(500)
    }
  },

  register(req, res, next) {
    const {username, password} = req.body
    let user = {
      username: username,
      password: password,
      id: id
    }
    id++
    users.push(user)
    req.session.user.username = username
    res.status(200).send(req.session.user)
  },

  signout (req,res,next) {
    req.session.destroy()
    res.status(200).send(req.session)
  },

  getUser (req, res, next) {
    res.status(200).send(req.session.user)
  }
}