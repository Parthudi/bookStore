import React,{useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../config'
import {Link} from 'react-router-dom'

const SignUp = (props) => {

const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
})

    const {name , email, password, error, success} = values

    const signUpHandler = async (user) => {
          try{
               return await fetch(`${API}/user/signup`,{
                method: "POST",
                headers: {
                          Accept:  "application/json",
                        "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
              }).then(response => response.json())
    
            } catch(error) {
                setValues({ ...values, error: error ,  success: false })
        }          
      }
  
      const clickSubmit = (event) => {
                event.preventDefault()
                setValues({ ...values, error: "", success: false})
                signUpHandler({name, email, password}).then(datas => {
                    if(datas.error) {
                        
                        setValues({ ...values, error: datas.error, success:false})
                     } else {
                         
                         setValues({...values, name:"", email:"", password:"", error:"", success:true})
                     }
            })
      }
    const handleOnChange = (event) => {
            setValues({ ...values, [event.target.name] : event.target.value, error:"" })
        }

    const signUpForm = () => {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted"> Name </label>
                    <input type='text' className="form-control" name='name' onChange={handleOnChange} value={name} />
                </div>

                <div className="form-group">
                    <label className="text-muted"> Email </label>
                    <input type='text' className="form-control" name='email' onChange={handleOnChange} value={email} />
                </div>

                <div className="form-group">
                    <label className="text-muted"> Password </label>
                    <input type='password' className="form-control" name='password' onChange={handleOnChange} value={password} />
                </div>
                <button className="btn btn-primary" onClick={clickSubmit}> Submit </button>
            </form>
            )
        }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : 'none' }}> {error} </div>
        )
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? "" : 'none'}}> New User Created. <Link to='/signin'> Please Signin </Link> </div>
        )
    return(
        <Layout title="Signup" description="Signup book ecommerce Store" className="container col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {signUpForm()}
                
        </Layout>
    )
}

export default SignUp