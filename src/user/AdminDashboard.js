import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}from '../serverside/index'
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: { name, email, role}} = isAuthenticated()

        const adminLinks = () => {
            return(
                <div className="card">
                    <h3 className="card-header" > Admin Links </h3>
                    <ul className="list-group">
                         <li className="list-group-item">
                            <Link className="nav-link" to='/create/category'> Create Category </Link>     
                         </li>

                         <li className="list-group-item">
                            <Link className="nav-link" to='/create/product'> Create Product </Link>     
                         </li>
                     </ul>
                </div>
            )}

        const adminProfile = () => {
            return (
                <div className="card mb-5">
                <h3 className="card-header"> Admin Informaton</h3>
                <ul className="list-group">
                    <li className="list-group-item"> Name:  <b> {name} </b> </li>
                    <li className="list-group-item"> E-mail: <b> {email} </b> </li>
                    <li className="list-group-item"> Role: <b> {role} </b></li>
                </ul>
            </div>
            )}
        
        return(
            <Layout title="Dashboard" description={`Hellow ${name}, have a good day`} className="container-fluid"> 
                    <div className="row">
                        <div className="col-3">
                            {adminLinks()}
                        </div>
                        <div className="col-9">
                            {adminProfile()}
                        </div>
                    </div>

                
            </Layout>
        )
}   

export default AdminDashboard