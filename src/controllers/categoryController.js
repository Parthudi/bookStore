const Category = require('../models/categoryModel')


exports.findCategoryId = async(req, res, next, id) => {
    try{
            const category = await Category.findById(id)
            req.category = category

            next()
    } catch(error) {
        res.status(403).send(error)
    }
}

exports.create = async(req, res) => {
    try{
        const category = new Category(req.body)

        await category.save()
        res.status(201).json({ category })
        
      }catch(error){
          res.status(403).json({ error: "Category should be unique"})
      }
}

exports.read = async(req, res) => {
    try{
            const category = await req.category
            res.status(201).send(category)

    } catch(error) {
        res.status(403).send(error)
    }
}

exports.update = async( req, res) => {
        
    try{
        const category = await req.category
        category.name = req.body.name
        
        await category.save()
        res.status(201).send(category)

    } catch(error){
        res.status(403).send({error: "OOPS Something went wrong while updating "})
    }
}

exports.remove = async( req, res) => {
    try{
            await req.category.remove()
            res.status(201).send('category deleted')
    } catch(error) {
        res.status(403).send({ error: "Something Went Wrong"})
    }
}

exports.listCategories = async(req, res) => {
    try{
            const category = await Category.find({})
            res.status(201).send(category)
    }catch(error) {
        res.status(403).send(error)
    }
}