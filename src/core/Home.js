import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {getProducts} from './apiHome'
import Card from './Card'
import Search from "./Search"

const Home = () => {
    const [sortBySold, setSortBySold] = useState([])
    const [sortByArrival, setSortByArrival] = useState([])
    const [ , setError] = useState(false)

    const sortSold = () => {
        getProducts('sold').then(data => {
           if(data.error) {
               setError(data.error)
                } else{
                    setSortBySold(data)
                }
            })
        } 

    const sortArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
                    } else{
                        setSortByArrival(data)
                     }
                 })
             }
            
    useEffect(() => {
        sortSold()
        sortArrival()
    }, [])

    return(
       <Layout title="Home Page" description="Booki-ecommerce Layout" className="container-fluid">   
        <Search />

         <h2 className="mb-4" style={{color: "grey"}}> New Arrival </h2>
         <div className="row"> 
            {sortByArrival.map((prod, i) => (
                <div key={i} className="col-4 mb-3">
                    <Card  product={prod} />
                </div>
          ))}
         </div> <br/><br/><br/><br/>
          
    <hr/>
         <h2 className="mb-4" style={{color: "grey"}}> Best Sellers </h2>
         <div className="row">
         {sortBySold.map((prod, i) => (
             <div key={i} className="col-4 mb-3">
                <Card product={prod} />
             </div>
          ))}
         </div>
                   
       </Layout>
    )
}

export default Home