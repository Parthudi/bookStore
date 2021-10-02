import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getCart} from './CartItems'
import {Link} from "react-router-dom"
import Card from './Card'
import Checkout from "./Checkout"

const Cart = () => {
    const [items, setItems] = useState([])

    const getCartItems = async() => {
        const items = await getCart();
        setItems(items);
    }

    useEffect(() => {
        getCartItems();
    }, [items])
    

    const showItems = (items) => {
        return(
            <div>
                <h2> Your Cart Has {`${items.length}`} Items</h2>
                <hr/>
                {items.map((product, i) => <Card key={i} 
                                                product={product} 
                                                showAddCartButton={false} 
                                                cartUpdate={true} 
                                                removeItem={true} /> )}
            </div>
        )
    }

    const noItemsMessage = () => {
        return(
            <h2> Your Cart is Empty . <br/> <Link to="/shop"> Continue Shopping </Link> </h2>
        )
    }

    return(
        <Layout title="Shopping Cart" description="Manage Your Cart Items. Add Remove Checkout or Continue Shopping" className="container-fluid">   
            <div className="row">
                <div className="col-6">
                    { items.length > 0 ? showItems(items) : noItemsMessage() }
                </div>

                <div className="col-6">
                    <h2 className="mb-4"> Your Cart Summary </h2>
                    <hr/>
                    <Checkout products={items} />
                    
                </div>
            </div>
                    
        </Layout>
     )
}

export default Cart;