import React,{useState} from 'react'

const RadioBox = ({prices, handleFilters}) => {
    const [value , setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value)
    }

    return prices.map((p, i) => (
        <div key={i}> 
                              {/* id which are not in checked state}  empty array*/}
             <input type="radio" value={`${p._id}`} name={p} onChange={handleChange}  className="mr-2 ml-4" />
             <label className="form-check-label">   {p.name}   </label>    
                      
        </div>                  
    ))
}

export default RadioBox