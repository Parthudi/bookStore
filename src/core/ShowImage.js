import React from 'react'
import {API} from '../config'

const ShowImage = (props) => {

    var IMG = `${API}/${props.url}/photo/${props.product._id}`
    return(
    <div className="product-img">
        <img src={IMG} alt={props.product.name} className="mb-3" style={{maxHeight:"100%", maxWidth:"100%"}}/>
    </div>
    )
  }

export default ShowImage