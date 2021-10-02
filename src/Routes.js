import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import PrivateRoute from './serverside/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './serverside/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ShopPage from './core/ShopPage'
import Product from "./core/Product"
import Cart from "./core/Cart"

const Routes = () => {
    return(
        <BrowserRouter>
                <Switch>
                    <Route path='/signup'                 exact component={Signup} />
                    <Route path='/shoppage'               exact component={ShopPage} />
                    <Route path='/signin'                 exact component={Signin} />
                    <Route path="/product/:productId"     exact component={Product} />
                    <Route path='/'                       exact component={Home} />
                    <Route path='/cart'                   exact component={Cart} />


                    <PrivateRoute path='/user/dashboard'  exact component={Dashboard} />
                    <AdminRoute   path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute   path='/create/category' exact component={AddCategory}/>
                    <AdminRoute   path='/create/product'  exact component={AddProduct}/>
                </Switch>
        </BrowserRouter>
    )
}

export default Routes