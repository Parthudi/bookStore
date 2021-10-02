import React, { useEffect, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem, updateCart, removeItemCart} from './CartItems'

const Card = ({ product, showViewProductButton = true , showAddCartButton = true, cartUpdate = false, removeItem = false}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState("");

    const getCount = (productCount) => {
        setCount(productCount)
    }

    useEffect(() => {
        getCount(product.count);
    }, []);

    const showViewButton = (showViewProductButton) => {
            return(
                showViewProductButton && ( 
                    <Link to={`/product/${product._id}`} >
                        <button className="btn btn-outline-primary mr-2 mb-2">
                                View Product
                         </button>
                    </Link>
                    )
                )
            }

    const addToCart = () => {
        addItem(product , () => {
            setRedirect(true);
        })
    }

    const redirectUser = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddCart = (showAddCartButton) => {
       return( showAddCartButton && <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                                        Add to Card
                                    </button>
        )
    }

    const showStock = (quantity) => {
            return quantity > 0 ? ( 
                <span className="badge badge-primary badge-pill"> In Stock </span> ) :
                ( <span className="badge badge-primary badge-pill"> Out Of Stock </span> )
    }

    const handleOnChange = (id, event) => {
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateCart(id, event.target.value);
        }
    }

    const showCartUpdateOption = (cartUpdate) => {
        return (cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"> Adjust Quantity </span>
                </div>
                <input type="number" name="quantity" className="form-control" value={count} onChange={(event) => handleOnChange(product._id, event)} /> 
            </div>
        </div>)
    }

    const removeItemFromCart = (removeItem) => {
        return (removeItem && 
            <button onClick={() => removeItemCart(product._id)} className="btn btn-outline-danger mt-2 mb-2"> 
                Remove Product
            </button>
        )       
    }

    return(
            <div className="card">

                {redirectUser(redirect)}

                <div className="card-header name text-capitalize" > {product.name} </div>
                <div className="card-body">
                  <center>  <ShowImage product={product} url="product"/> </center>

                <center> <hr style={{width:"270px"}} /> </center> 

                      {/* //product.description.substring(0,100)  it will only show description text upto 100 words */}
                    <p className="lead mt-2"> {product.description && product.description.substring(0,100)} </p>
                    <p className="black-10"> {product.price} Rs </p>
                    <p className="black-9"> Category : {product.category && product.category.name} </p>
                    <p className="black-8"> Added on {moment(product.createdAt).fromNow()} </p>

                        {showStock(product.quantity)}

                        <br/>

                        {showViewButton(showViewProductButton)}
                        {showAddCart(showAddCartButton)}
                        {removeItemFromCart(removeItem)}
                        {showCartUpdateOption(cartUpdate)}
                        
                </div> 
            </div>
    )
}

export default Card