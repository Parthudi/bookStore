import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated}from '../serverside/index'
import {Link} from 'react-router-dom'

const Dashboard = () => {
    const {user: { name, email, role}} = isAuthenticated()

        const userLinks = () => {
            return(
                <div className="card">
                    <h3 className="card-header" > User Links </h3>
                    <ul className="list-group">
                         <li className="list-group-item">
                            <Link className="nav-link" to='/cart'> My Cart </Link>     
                         </li>

                         <li className="list-group-item">
                            <Link className="nav-link" to='/profile/update'> Update Profile </Link>     
                         </li>
                     </ul>
                </div>
            )}
        const userProfile = () => {
            return (
                <div className="card mb-5">
                <h3 className="card-header"> User Informaton</h3>
                <ul className="list-group">
                    <li className="list-group-item"> Name:  <b> {name} </b> </li>
                    <li className="list-group-item"> E-mail: <b> {email} </b> </li>
                    <li className="list-group-item"> Role: <b> {role} </b></li>
                </ul>
            </div>
            )}
        const purchaseHistory = () => {
            return(
                <div className="card mb-5">
                <h3 className="card-header"> Purchase History </h3>
                <ul className="list-group">
                    <li className="list-group-item"> History </li>
                </ul>
            </div>
            )
        }
        
        return(
            <Layout title="Dashboard" description={`Hellow ${name}, have a good day`} className="container-fluid"> 
                    <div className="row">
                        <div className="col-3">
                            {userLinks()}
                        </div>
                        <div className="col-9">
                            {userProfile()}
                            {purchaseHistory()}
                        </div>
                    </div>

                
            </Layout>
        )
}   

export default Dashboard