const User = require('../models/userModel')

exports.findUserId= async (req, res, next, id) => {
    const user = await User.findById(id)

    if(!user) {
        throw new Error('user not found')
    }
    req.profile = user
    next()
    }

exports.signupUser = async (req, res) => {
    try{     
        const user = new User(req.body)
    
        await user.save()
        res.status(201).json({'user ' : user})

      }catch(error){         
        if(!req.body.name) {
            res.status(401).json({error: 'Please enter Name'})
        }
        if( 5>req.body.name.length || req.body.name.length>20) {
            res.status(401).json({error: "Name must be 6 to 20 digits"})
        }
        if(!req.body.email) {
            res.status(401).json({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).json({error: 'Please enter Password'})
        }       
        if(req.body.password.length < 6) {
            res.status(401).json({error: 'Password Should be Strong'})
        }
        else{
            res.status(401).json({error: "Fill the details Correctly"})
        }
        
      }
} 

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findUserCredientials(req.body.email, req.body.password)

        const token = await user.generateToken()
        res.cookie('t', token, { expire: new Date() + 9999 })  

        return res.status(200).json({user, token})

    }catch(error){
        if(!req.body.email) {
            res.status(401).json({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).json({error: 'Please enter Password'})
        }       
        if(req.body.password.length < 6) {
            res.status(401).json({error: 'Password Should be Strong'})
        }
        else{
            res.status(401).json({error: "Fill the correct details only! "})
        }
    }
}

exports.logoutUser = async (req, res) => {
    try{       
        console.log(req.user.tokenze)
        req.user.tokenze = req.user.tokenze.filter((token) => {
            return console.log(token.token !==  req.token)
        })
        await req.user.save() 
        res.status(200).json({message: 'SignOut Sucessfull' })
    }catch(error){
        res.status(401).send(error.message)
    }
}

exports.read = async(req, res) => {
    try{
        const user = await req.user
        res.status(201).send(user)
    } catch(error) {
        res.status(401).send(error)
    }
}

exports.update = async(req, res) => {
    try{
        const user = await User.findOneAndUpdate( {_id: req.profile._id}, {$set: req.body}, {new: true, useFindAndModify: false})
        res.status(201).send(user)
    }catch(error) {
        res.status(401).send(error)
    }
}

exports.remove = async(req, res) => {
    try{
        const user = await req.user.remove()
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(401).send(error)
    }
}
