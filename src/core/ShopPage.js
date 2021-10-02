import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import {allCategories, getFilteredProducts} from './apiHome'
import {prices} from './fixedPrices'
import RadioBox from './RadioBox'
import  CheckBox  from './CheckBox'
import Card from "./Card"

const ShopPage = () => {
    const [myFilters, setMyFilter] = useState({
        filters: {category: [] , price: []}
     })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false);
    const [skip, setSkip] = useState(0);
    const [limit, ] = useState(6);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

    const init = () => {
        return allCategories().then(data => {
           if(data.error) {
               setError(data.error)
            }else{
                setCategories( data )
            }
       })
    }

   const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data  => {
         if(data.error) {
               setError(data.error);
         }else{
            console.log("filtered data : " + JSON.stringify(data.product));
            setFilteredResults(data.product);
            setSize(data.size);
            setSkip(0)
         }
      })
   }

   const loadMore = () => {
      let toSkip = skip + limit;
      getFilteredProducts(toSkip, limit, myFilters.filters).then(data  => {
       if(data.error) {
             setError(data.error);
       }else{
          console.log("filtered data : " + JSON.stringify(data.product));
          setFilteredResults([...filteredResults , ...data.product]);
          setSize(data.size);
          setSkip(0)
       }
    })
   }

   const LoadMoreButton = () => {
      return(
         size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5"> Load More </button>
         )
      )
   }

    useEffect(() => {    
          init();
          loadFilteredResults(skip, limit, myFilters.filters);
        }, []);

  
    const handleFilters = (filters, filterBy) => { 
                const newFilters = {...myFilters}
                newFilters.filters[filterBy] = filters;

                if(filterBy === "price") {
                   let priceValues = handlePrice(filters);
                   newFilters.filters[filterBy] = priceValues;
                }
                loadFilteredResults(myFilters.filters)
                setMyFilter(newFilters)
         } 


      const handlePrice = (value) => {
         const data = prices;
         let array = []

         for(let key in data){
            if(data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
         }
         return array;
      }

    const showError = () => (
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                      {error} 
            </div>        
          )

    return(
        <Layout title="Shop Page" description="Shown Shop Page" className="container-fluid">   
            {showError()}
          <div className="row"> 
            <div className="col-3"> 
               <h4> Filter By Categories </h4> 
               <ul>
                  <CheckBox categories={categories}  handleFilters={filters => handleFilters(filters, "category")} />
               </ul>   <br></br>
                           

            <h4> Filter By Price range </h4> 
               <div>
                   <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")} /> 
                </div>

             </div>

             <div className="col-9">     
             <h2 className="mb-4"> Products </h2>
             <div className="row"> 
               {filteredResults && filteredResults.map((product, i) => (
                     <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                     </div>
                  )) }
               </div>  
               <hr/>    
               {LoadMoreButton()}
             </div>
                     
          </div> 
                              
        </Layout>
     )
}

export default ShopPage



