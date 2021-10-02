import React , {useState, useEffect} from "react"
import Layout from "./Layout"
import { read, listRelated} from './apiHome'
import Card from "./Card"

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedproduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then((data) => {
            if(data.error) {
                console.log(data.error);
            }else{
                setProduct(data);
                listRelated(data._id).then(data => {
                    if(data.error){
                        setError(data.error);
                    }else{
                        setRelatedProduct(data);
                    }
                })

            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId 
        loadSingleProduct(productId);
    }, [props])
    
    return(
        <div>   
                    {/* product.description.substring(0,100) only 100 words allowed */}
            <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">
               <div className="row"> 
                <div className="col-8 mb-3">
                    {product && product.description && <Card product={product} showViewProductButton={false} />  }
                </div>

                <div className="col-4">
                    <h4> Related Products </h4>
                    {relatedproduct && relatedproduct.map((dat, i) => (
                        <div className="mb-3">
                            <Card product={dat} key={i} />
                        </div>
                    ))}
                </div>
               </div>
            </Layout>

        </div>
    )
}

export default Product