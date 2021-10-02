const Product = require('../models/productModel')
const sharp = require('sharp')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.findproductId = async(req, res, next, id) => {
  try{  
        const product = await Product.findById(id).populate("category")
        req.product = product
        next()

  } catch(error) {
    res.status(403).send(error)
  }
}

exports.create = async(req, res) => {
    try{    
          let product = new Product(req.body)
          let buffer = await sharp(req.file.buffer).resize({height:300, width:260}).png().toBuffer()
         
          req.product = product
          req.product.photo = buffer
        
          const prod = await req.product.save()
          res.status(201).json({prod})
        
      }catch(error){
          res.status(403).send({ error: error.message})
      }
}

exports.read = async(req, res) => {
  try{
        req.product.photo = undefined  // as due to this there will be huge suffs in postman api
        res.status(201).send(req.product)

    }catch(error) {
      res.status(403).send(error)
    }
  }

  exports.update = async(req, res) => {
    try{    
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            if(err) {
              return res.status(400).json({
                error: 'Image could not be uploaded'
                })
            }
           
           //1kb = 1000
           //1mb = 10,00,000
           if(files.photo.size > 2000000) {
                res.status(401).send({ error: " Image Should be less than 2MB in size"})
              }

           const {name, description, price, category, shipping, quantity, photo} = fields

         let product = req.product
         product = _.extend(product, fields)

           if(files.photo) {
              product.photo.data = fs.readFileSync(files.photo.path)
              product.photo.contentType = files.photo.type
            }
           
            product.save()
            res.status(200).send('product updated')
        })
      }catch(error){
          res.status(403).send(' Image cannot be added ')
      }
}

exports.remove =  async(req, res) => {
  try{
          await req.product.remove()
          res.status(201).send('Product deleted')
      } catch(error) {
        res.status(403).send(error)
    } 
  }

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4                 most sold first
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4         latest created first
 * if no params are sent then return all products
 */
exports.listOfProducts = async(req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try{
      const products = await Product.find({}).select("-photo").populate("category").sort([[sortBy, order]]).limit(limit).exec()
      res.status(201).send(products)
  }catch(error) {
    res.status(403).send(error)
  }
}  

exports.listRelatedProducts = async(req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try{                 //$ne = not include , as we want the related products so we dont show this product .
        let products = await Product.find({ _id: {$ne: req.product}, category: req.product.category }).select("-photo").populate('category', '_id name').limit(limit).exec() 
                                                                  //fetch product based on this category
        res.status(201).send(products)
  } catch(error) {
    res.status(403).send({error: "Related products not found"})
  }
}

exports.listAllCategories = async(req, res) => {
      try{
        const categories = await Product.distinct("category", {})

          res.status(201).send(categories)
      } catch(error){
            res.status(403).send({error: "categories not found"})
      }
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = async (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);   //if user wants to see more products it works as load more button
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
  try{
    const product = await Product.find(findArgs).select("-photo").populate("category").sort([[sortBy, order]])
                      .skip(skip).limit(limit).exec()
          
          res.status(201).send({size: product.length , product})
      } catch(error) {
          res.status(403).send(error)
      }
};

exports.productBySearch = async (req, res) => {
  try{
   //create query object to hold search value and category value
   const query = {}

   //assign search value to query.name
   if(req.query.search){                              
          //regex is used for pattern matching.     // i is for case small and caps both ,case insensitive
     query.name = {$regex: req.query.search, $options: 'i'}

     //assign category value to query.category
     if(req.query.category && req.query.category != "All"){
        query.category = req.query.category
     }

     //find product with query object based on 2 properties
     //search and category
     Product.find(query, (error, products) => {
        if(error) {
            return res.status(400).json({error})
        }
        res.status(200).send(products)
     }).select("-photo")
   }  } catch(error) {
          res.status(403).send(error)
      }
}

exports.photo = async(req, res, next)  => {
    if(req.product.photo) {
      console.log("photu :" ,req.product.photo);
      return res.status(201).send(req.product.photo)
      }
        next()
}

