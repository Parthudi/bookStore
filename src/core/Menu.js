import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {SignOut, isAuthenticated} from '../serverside/index'
import shopping from "../images/shopping.png"
import {itemTotal} from "./CartItems"

//history-> current url path
const isActive = (history, path) => {
    if(history.location.pathname === path){
        return { color:"yellow" }
        }
}

const Menu = (props) => {
   const {user, token} = isAuthenticated()

    return(
        <ul className="nav nav-tabs  btn btn-info" >

            { <img src={shopping} alt ="logo" height="50px" style={{float:"left", margin:"0px 15px"}} /> }

                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(props.history, '/')} to='/' >  
                        Home  
                    </Link>
                </li>

                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(props.history, '/shoppage')} to='/shoppage' > 
                        ShopPage
                    </Link>
                </li>

                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(props.history, '/cart')} to='/cart' > 
                        Cart <sup><small className="cart-badge"> {itemTotal()} </small> </sup>
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 'admin' ?
                       ( <li className='nav-items'>
                         <Link className='nav-link' style={isActive(props.history, '/admin/dashboard')} to= '/admin/dashboard'  >  
                            Admin Dashboard
                         </Link>
                        </li>  )   :

                        (<li className='nav-items'>
                        <Link className='nav-link' style={isActive(props.history, '/user/dashboard')} to= '/user/dashboard'  >  
                             Dashboard
                        </Link>
                        </li>)
                     }
               

             {!isAuthenticated() ?
                <Fragment>
                         <li className='nav-items'>
                    <Link className='nav-link' style={isActive(props.history, '/signup')} to='/signup' > 
                         Signup  
                    </Link>
                </li>

                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(props.history, '/signin')} to='/signin' > 
                        Signin  
                    </Link>
                </li>

                </Fragment>      : null }
                    
                {isAuthenticated() ? 
                <div>
                    <li className='nav-items'>
                    <span className='nav-link' style={{cursor : "pointer" ,color: 'while'}} onClick={() => 
                        SignOut(user._id, token).then(data => {
                                props.history.push('/')
                            }) } > 
                        Signout  
                    </span>
                </li>
                </div>        : null   }
                                
        </ul>
    )
}

export default withRouter(Menu)