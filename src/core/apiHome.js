import {API} from '../config'
import queryString from "query-string"

export const getProducts = async (sortBy) => {
    try{
        return await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
                method: "GET",   
            }).then(response => response.json() )
        } catch(error) {               
            console.log(error)
          }  
}

export const allCategories = async () => {
    try{
        return await fetch(`${API}/allcategories`, {
                method: "GET",   
            }).then(response => response.json() )
        } catch(error) {               
            console.log(error)
          }  
}

export const getFilteredProducts = async(skip, limit, filters = {} ) => {
    try{
        const data = {
            skip,
            limit,
            filters
        }
    return await fetch(`${API}/products/by/search`, {
            method: "POST",
            headers: {
                    Accept:  "application/json",
                    "Content-Type": "application/json",
                },   
            body: JSON.stringify(data)
        }).then(response => response.json() )
    } catch(error) {               
        console.log(error)
    }  
  }
  
  export const searchProducts = async (params) => {
    try{
        const queryParams = queryString.stringify(params);
        console.log("queryParams " +queryParams);
        return await fetch(`${API}/products/search?${queryParams}`, {
                method: "GET",   
            }).then(response => response.json() )
        } catch(error) {               
            console.log(error)
          }  
    }

    export const listRelated = async (productID) => {
        try{
            return await fetch(`${API}/products/related/${productID}`, {
                    method: "GET",   
                }).then(response => response.json() )
            } catch(error) {               
                console.log(error)
              }  
        }

export const read = async (productId) => {
    try{
        return await fetch(`${API}/product/${productId}`, {
                method: "GET",   
            }).then(response => response.json() )
        } catch(error) {               
            console.log(error)
        }  
    }

export const getBrainTreeToken = (userId, token) => {
        try{
        return fetch(`${API}/braintree/getToken/${userId}`, {
                method: "GET",
                headers: {
                        Accept : "application/json",
                        Authorization :  `Bearer ${token}`,
                        "Content-Type" : "application/json",
                    },   
            }).then(response => response.json() )
        } catch(error) {               
            console.log(error)
        }  
    }

    export const getBrainTreePayment = (paymentMethodNonce, amount, userId, token) => {
        try{
        return fetch(`${API}/braintree/payment/${userId}`, {
                method: "POST",
                headers: {
                        Accept : "application/json",
                        Authorization :  `Bearer ${token}`,
                        "Content-Type" : "application/json",
                    },
                body : JSON.stringify({paymentMethodNonce , amount})   
            }).then(response => response.json({paymentMethodNonce , amount}))
        } catch(error) {               
            console.log(error)
        }  
    }