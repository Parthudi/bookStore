const express = require("express");
const route = express.Router();

const {generateToken, paymentMethod} = require("../controllers/brainTreeController")
const {Auth, isAuth } = require('../middleware/auth')
const {findUserId} = require('../controllers/userControllers')

route.get("/braintree/getToken/:userId" , Auth, generateToken);
route.post("/braintree/payment/:userId" , Auth, paymentMethod);

route.param('userid', findUserId);


module.exports = route;