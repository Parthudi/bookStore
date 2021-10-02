const express = require('express')
const route = new express.Router()
const { create, findproductId, read, update, remove, listOfProducts, listRelatedProducts, listAllCategories, listBySearch, photo, productBySearch} = require('../controllers/productController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')
const {findUserId} = require('../controllers/userControllers')
const multer  = require('multer')

const upload = multer({
    limits: {
        fileSize: 2000000       //2mb
    }, 
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            throw new Error('File not Supported')
        }
        callback(undefined, file)
    }
})

//Routes
route.param('userid', findUserId)
route.param('productId', findproductId)

route.post('/product/create/:userid', Auth, isAuth, isAdmin, upload.single('photo') , create)
route.get('/product/:productId', read)
route.patch('/product/update/:productId/:userid',Auth, isAuth, isAdmin, update)
route.delete('/product/delete/:productId/:userid',Auth, isAuth, isAdmin, remove)
route.get('/products' , listOfProducts)
route.get('/products/related/:productId' , listRelatedProducts)
route.get('/products/categories', listAllCategories)
route.post("/products/by/search", listBySearch);
route.get('/product/photo/:productId' , photo)
route.get("/products/search", productBySearch);

module.exports = route
