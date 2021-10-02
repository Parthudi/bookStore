const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
       }
    },
    {
        timestamps: true
       })


const Category = mongoose.model('category', categorySchema)

module.exports = Category