import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}from '../serverside/index'
import {createProduct, allCategories} from './ApiAdmin'

const AddProduct = () => {
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
            name: '',
            description: '',
            price: '',
            categories: [],
            category: '',
            shipping: '',
            quantity: '',
            photo: '',
            loading: false,
            error: '',
            createdProduct: '',
            redirectToProfile: false,
            formData: '',
             });

    const {   
                name,
                description,
                price,
                categories,
                // category,
                // shipping,
                quantity,
                // photo,
                loading,
                error,
                createdProduct,
                // redirectToProfile,
                formData,
             } = values ;

    
    useEffect(() => {

        const init = () => {
           return allCategories().then((data) => {
                if(data.error) {
                    setValues({ error: data.error})
                 }else{
                     setValues({ categories: data, formData: new FormData() })
                 }
            })
         }

          init();
        }, []);

    const handleOnChange = name => event => {  
            const value = name === "photo" ? event.target.files[0] : event.target.value
            formData.set(name, value)
            setValues({...values, [name] : value})
       }

    const handleOnSubmit = event => {
            event.preventDefault()

            setValues({...values, loading: true, error: ""})
            createProduct( user._id, token, formData ).then(data => {
                if(data.error) {
                    setValues({...values, loading:false, error: data.error, createdProduct:false, redirectToProfile: false})
                }else{
                    console.log(data)
                    setValues({...values, name:"", description: "", photo: "", price: "",redirectToProfile: true,
                                        quantity:"" , error: "", loading:false, createdProduct: data.name})
                }
            })
    }
    
    const productForm = () => {

           return <form className="mb-5" onSubmit={handleOnSubmit}>
                    <h4> Post Photo </h4>
                    <div className="form-group"> 
                        <label className="btn btn-secondary">
                            <input type="file" onChange={handleOnChange('photo')} name="photo" accept="image/*" />
                        </label>                       
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Name </label>
                        <input type="text" onChange={handleOnChange('name')}  value={name|| ''} className="form-control" />                                            
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Description </label>
                        <textarea type="text"  onChange={handleOnChange("description")}  value={description|| ''} className="form-control" />                                            
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Price </label>
                        <input type="Number" onChange={handleOnChange("price")}  value={price|| ''} className="form-control" />                                            
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Category </label>
                        <select   onChange={handleOnChange("category")} className="form-control" > 
                            <option value=""> Select any one </option>
                            {categories && categories.map((categori,index) => (
                                <option key={index} value={categori._id}> {categori.name}  </option>
                            ))}
                        </select>                                            
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Shipping </label>
                        <select  onChange={handleOnChange("shipping")} className="form-control" > 
                            <option value=""> Select any one </option>
                            <option value="0"> No </option>
                            <option value="1"> Yes </option>
                        </select>                                            
                    </div>

                    <div className="form-group"> 
                        <label className="text-muted"> Quantity </label>
                        <input type="Number"  onChange={handleOnChange("quantity")}  value={quantity|| ''} className="form-control" />                                            
                    </div>

                    <button className="btn btn-outline-primary"> Create Product </button>
            </form>
      }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                 {error} 
        </div>        
      )

    const showLoading = () =>  (
        loading && (<div className="alert alert-success"> <h2> Loading... </h2>  </div>)  )

    // const redirectUser = () => {
    //         if(redirectToProfile) {
    //              return  <Redirect to="/admin/dashboard" /> 
    //         }
    //     }
    const showSuccess = () => {

        <div className="alert alert-info" style={{display: createdProduct ? "": 'none'}}>
                    <h2> {`${createdProduct}`} Successfully created !! </h2>
        </div>
       }

    return(
        <Layout title="Add a new Product" description={`Hellow ${user.name}, ready to create new Product ?`} >

        <div className="row">
            <div className="col-md-8 offset-md-2">              
               {showLoading()}
               {showSuccess()}
               {showError()}
               {/* {redirectUser()}               */}
               {productForm()}
            </div>
        </div> 

        </Layout>
        )
    }

export default AddProduct