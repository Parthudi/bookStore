const express = require('express')
const route = new express.Router()
const { create, findCategoryId, read, remove, update, listCategories } = require('../controllers/categoryController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')
const {findUserId} = require('../controllers/userControllers')


//Routes
route.param('userid', findUserId)
route.param('categoryid', findCategoryId)

route.post('/category/create/:userid',Auth, isAuth, isAdmin, create)
route.get('/category/read/:categoryid', read)
route.patch('/category/update/:categoryid/:userid',Auth, isAuth, isAdmin,  update)
route.delete('/category/delete/:categoryid/:userid',Auth, isAuth, isAdmin,  remove)
route.get('/allcategories', listCategories)

module.exports = route