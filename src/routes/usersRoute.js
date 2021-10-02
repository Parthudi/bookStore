const express = require('express')
const route = new express.Router()
const {signupUser, loginUser, logoutUser, findUserId, read, update, remove} = require('../controllers/userControllers')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/user/signup' , signupUser)
route.post('/user/login', loginUser)
route.param('userid', findUserId)

route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
route.get('/user/:userid',Auth, isAuth, read)
route.patch('/user/update/:userid',Auth, isAuth, update )
route.delete('/user/delete/:userid',Auth, isAuth, remove )

route.get('/secret/:userid',Auth, isAuth,isAdmin, (req, res) => {
    res.json('done')
})

module.exports = route