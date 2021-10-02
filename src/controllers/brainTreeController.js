const User = require('../models/userModel')
const braintree = require("braintree");
const e = require('express');
// require("dotenv").config()

const gateway = new braintree.BraintreeGateway({
    environment : braintree.Environment.Sandbox,
    merchantId : process.env.BRAINTREE_MERCHANT_ID,
    publicKey : process.env.BRAINTREE_PUBLIC_KEY,
    privateKey : process.env.BRAINTREE_PRIVATE_KEY
})

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({} , (err, response) => {
        if(err){
            res.status(500).send(err);
        }else{
            console.log("response token : " + response);
            res.status(200).send(response);
        }
    })
}

exports.paymentMethod = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    let newTransaction = gateway.transaction.sale({
        amount : amountFromTheClient,
        paymentMethodNonce : nonceFromTheClient,
        options :{
            submitForSettlement : true
        }
    },(error, result) => {
        if(error){
            res.status(401).send(error)
        }else{
            res.status(200).send(result)
        }
    } )
}
