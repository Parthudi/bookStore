import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Redirect} from 'react-router-dom'
import { signInHandler,authenticate, isAuthenticated} from '../serverside/index'

const SignIn = () => {

    const [values, setValues] = useState({
        email: "parthudi@gmail.com",
        password: "parthudi",
        error: "",
        loading: false,
        redirectToRefer: false
    })
    const {email, password, error, loading, redirectToRefer} = values
 

    const clickSubmit = (event) => {
        event.preventDefault()

        setValues({ ...values, error: "", loading: true})
        signInHandler({email, password}).then(datas => {
            if(datas.error) {
              
                setValues({ ...values, error: datas.error, loading:false})
             } else {
               
                 authenticate(datas, () => {
                    setValues({...values, redirectToRefer: true})
                 })
              }
           })
        }

        const handleOnChange = (event) => {

            setValues({ ...values, [event.target.name] : event.target.value, error:"" })
        }

    const signInForm = () => {
        return(
            <form>
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
        const showLoading = () =>  (
          loading && (<div className="alert alert-info"> <h2> Loading... </h2>  </div>)  )
            
        const redirectUser = () => {
                if(redirectToRefer) {
                    
                    if(isAuthenticated().user && isAuthenticated().user.role === "admin") {
                           return  <Redirect to="/admin/dashboard" />
                           
                        } else {
                           return  <Redirect to="/user/dashboard" />
                        }
                }
            }
            
    return(
       <Layout title="Signin" description="Signin ecommerce Store" className="container col-md-8 offset-md-2">
                {showError()}
                {showLoading()}
                {redirectUser()}
                {signInForm()}
       </Layout>
    )
}

export default SignIn