import React , {useState, useEffect} from "react"
import {allCategories, searchProducts} from './apiHome'
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false,
    })

    const { categories, category, search, results, searched} = data;
    
    const loadCategories = () => {
        allCategories().then(data => {
            if(data.error) {
                console.log("error : " +data.error);
            }else{
                setData({...data , categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories();
    } , [])

    const onHandleChange = name => (event) => {
        setData({...data, [name] : event.target.value, searched:false});
    }

    const searchData = () => {
        console.log(search, category);
        if(search) {
            searchProducts({search : search || undefined, category: category})
            .then(response => {
                if(response.error) {
                    console.log(response.error);
                }else{
                    setData({ ...data , results: response, searched: true})
                }
            })
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        searchData()
    }

    const seachedMessage = (searched,results) => {
            if( searched && results.length > 0 ) {
                return ` Found ${results.length} Products`
            }
            if( searched && results.length < 1 ) {
                return ` No Products Found !!`
            }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-5 mb-5 text-info"> 
                    {seachedMessage(searched,results)}
                </h2>
                <div className="row">
                    {results && results.map((p,i) =>  ( 
                        <div key={i} className="col-4 mb-3">
                            <Card key={i} product={p} />
                        </div>
                        ))}
                </div>
            </div>
        )}

    const searchHandler = () => {
       return( <form onSubmit={onSubmitHandler}>
        <span className="input-group-text">
            <div className="input-group input-group-lg"> 
                <div className="input-group-prepend">
                    <select className="btn mr-2" onChange={onHandleChange("category")}> 
                        <option value="All"> All </option>
                        {categories.map((c,i) => (
                              <option key={i} value={c._id}> {c.name} </option>  
                        ))}
                    </select>
                </div>

                <input type="search" 
                    className="form-control" 
                        name="search" 
                            onChange={onHandleChange("search")} 
                                placeholder="Search For Products" />
            </div>
            <div className="btn input-group-append" style={{border:"none"}}> 
                    <button className="input-group-text"> Search  </button>
            </div>
        </span>

        </form>
    )}

    return(
        <div className="row">
            <div className="container mb-3"> 
                {searchHandler()} 
            </div>

            <div className="container-fluid mb-3"> 
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;