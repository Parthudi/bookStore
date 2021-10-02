const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const Auth = async(req, res, next) => {
    try{
        const token  = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWTSECRET)
       
        const user   = await User.findOne({_id: decode._id, 'tokenze.token': token })
        
        if(!user) {
            throw new Error()
          }
         console.log('Auth done')
        req.token = token    
        req.user  = user
        next()
    } catch(error) {
        console.log(error)
        res.status(403).send('error : please authenticate. ')
    }
   
}

const isAuth = async(req, res, next) => {
    try {
    // console.log(req.profile._id.toString())  //id in url
    // console.log(req.user._id.toString())     //id in login
    //if letters are numeric aswell as string use toString() so we can compare them or do anyting.
   console.log(JSON.stringify(req.profile));
   console.log(JSON.stringify(req.user));

     let useMe = req.profile && req.user && req.profile._id.toString() == req.user._id.toString()

    if( (!useMe)) {
        throw new Error('You Cant See Me')
        }
        console.log('isAuth done')
        next()
    } catch(error) {
            res.status(403).send('False profile')
        }
    
}

const isAdmin = (req, res, next) => {
    if(req.profile.role === 'user') {
        
        throw new Error( 'Admin Resource Access denied!!' )
    }
    console.log('isAdmin done')
    next()
}


module.exports = {Auth ,isAuth, isAdmin}