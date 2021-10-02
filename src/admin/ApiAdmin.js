import {API} from '../config'

export const createCategory = async (userid, token, category ) => {
   
    try{
    return await fetch(`${API}/category/create/${userid}`, {
            method: "POST",
            headers: {
                    Accept:  "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },   
            body: JSON.stringify(category)
        }).then(response => response.json() )
    } catch(error) {               
        console.log(error)
      }  
    } 

export const createProduct = async (userid, token, product ) => {  
        try{
        return await fetch(`${API}/product/create/${userid}`, {
                method: "POST",
                headers: {
                        Accept:  "application/json",
                        "Authorization": `Bearer ${token}`
                    },   
                body: product
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