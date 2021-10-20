import React, { useEffect, useState } from 'react'
import { getProducts , getBrainTreeToken, getBrainTreePayment} from './apiHome'
import {Link} from 'react-router-dom'
import { isAuthenticated } from '../serverside';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    })
   
   const userId =  isAuthenticated() && isAuthenticated().user._id;
   const token =  isAuthenticated() && isAuthenticated().token;


    const getToken = (userId, token) => {
        getBrainTreeToken(userId, token).then(dataa => {
            if(dataa.error) {
                setData({ ...data , error:dataa.error});
            }else{
                setData({clientToken: dataa.clientToken });
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
           return products.reduce((currentValue, nextValue) => {
                // initially currentValue starts from 0 number, nextValue is products one by one !!
                return currentValue + nextValue.count * nextValue.price;
           }, 0); 
    }

    const showCheckout = () => {
        return(isAuthenticated() ? ( <div> {showDropIn()} </div> )
        :
        (
            <Link to="signin">
                <button className="btn btn-primary">
                    signin to checkout
                </button>
            </Link>
        )
        )
    }
    
    const handlePayment = () => {
        let nonce ;
        let totalAmount;
        let getNonce = data.instance.requestPaymentMethod().then(response =>{
            console.log(response);
            nonce = response.nonce;
            totalAmount = getTotal(products);

            getBrainTreePayment(nonce, totalAmount, userId, token).then(res => {
                console.log(res);
                setData({...data, success: res.success});
            }).catch(error => setData({...data , error : error.message}))

        }).catch((error) => {
            setData({...data, error : error.message})
        })
    }

    const showDropIn = () => {
       return (<div onBlur = {() => setData({...data, error:""})}>
                {data.clientToken !== null && products.length >1 ? (
                    <div> 
                        <DropIn options={{ 
                            authorization: data.clientToken
                        }} onInstance={instance => (data.instance = instance)} />
                       <button onClick={handlePayment} className="btn btn-success btn-block" > PAY NOW </button>
                    </div>
                ) : null }
            </div>)
        }

        const showSuccess = (success) => {
            return(<div className="alert alert-info" style={{ display : success ? "" : "none" }}>
                Thanx ! Your Payment Was Successful !!
            </div>)
        }

        const showError = (error) => {
            return(<div className="alert alert-danger" style={{ display : error ? "" : "none" }}>
                {error}
            </div>)
        }


    return(
            <div>
                <h2> Total: {getTotal()} </h2>
                 {showSuccess(data.success)}
                 {showError(data.error)}
                {showCheckout()}
            </div>
                    
     )
}

export default Checkout;