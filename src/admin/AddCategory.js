import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}from '../serverside/index'
import {createCategory} from './ApiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleOnChange = (e) => {
            setError(false)
            setName(e.target.value)
        }   

    const handleOnSubmit = async (e) => {
        e.preventDefault()       

        //make request to api to create category
        createCategory(user._id, token, {"name":name})
        .then(data => {  
                if(data.error) {
                    setError(true)
                    setSuccess(false)
                  } else{
                      setSuccess(true)
                      setError("")
                  }           
        })
    }

    const categoryForm = () => {
       return <form onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label className="text-muted"> Name </label>
                <input type="text" className="form-control" name="name" value={name} onChange={handleOnChange} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary"> Create Category </button>
        </form>
    }

    const showError = () => {
         if(error) {
           return <h3 className="text-danger"> Category should be unique </h3>
         }          
    }

    const showSuccess = () => {
            if(success) {
               return <h3 className="text-success"> {name} Successfully created  </h3>
            }
        }

    return(
        <Layout title="Add a new categoty" description={`Hellow ${user.name}, ready to create new Category ?`} >

        <div className="row">
            <div className="col-md-8 offset-md-2">
                {showError()} <br/>
                {showSuccess()} <br/>
                {categoryForm()}
            </div>
        </div> 

        </Layout>
        )
    }

export default AddCategory