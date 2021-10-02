import {API} from '../config'

export const authenticate = (data, next ) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('JWT', JSON.stringify(data))
        next()
    }
}

//very important API . It returns all users information
export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
      }
     if(localStorage.getItem("JWT")) {
         return JSON.parse(localStorage.getItem('JWT'))
         } else{
             return false
         }
 } 

export const signInHandler = async (user) => {
    return await fetch(`${API}/user/login`,{
     method: "POST",
     headers: {
              Accept:  "application/json",
             "Content-Type": "application/json"
     },
     body: JSON.stringify(user)
   }).then(response => response.json()) 
  }

export const SignOut = async (userid, token ) => {
    try{       
        if(typeof window !== 'undefined') {
            localStorage.removeItem('JWT')

        return await fetch(`${API}/user/logout/${userid}`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
         }).then(response =>  console.log('signout', response) )
        }

      } catch(error) {
          console.log(error)
      }
    }

