const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
       },
    description: {
        type: String,
        maxlength: 400,
        required: true
       },
    price: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
    category: {
        type: ObjectId,                  //mongoose.Schema.ObjectId
        ref: 'category',                 //collection name
        required: true
      },
    quantity: {
        type: Number,
      },
    sold: {
        type: Number,
        default: 0
      },
    photo: {
        type: Buffer,
      },
    shipping: {
        type: Boolean,
        required: false       
      },
     },
    {
        timestamps: true
       })



const Product = mongoose.model('Product', productSchema)

module.exports = Product