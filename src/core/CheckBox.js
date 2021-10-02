import React, { useState } from 'react'

const CheckBox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const handleOnToggle = categori => () => {
        // console.log(checked.indexOf(categori))

//if category present then it returns its position or else returns -1
//if _id is at 4th position in array it returns 3 number if _id is at 6th position it returns 5 number
        const currentCategoryId = checked.indexOf(categori)
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(categori)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
          }
          console.log(newCheckedCategoryId)
          setChecked(newCheckedCategoryId)
          handleFilters(newCheckedCategoryId)
        //   handleFilter(newCheckedCategoryId, "category")
        }

      return categories.map((categori, ind) => (
        <li className="list-unstyled" key={ind}> 
                              {/* id which are not in checked state}  empty array*/}
             <input type="checkbox"  onChange={handleOnToggle(categori._id)} value={checked.indexOf(categori._id === -1)} className="form-check-input" />
             <label className="form-check-label">   {categori.name}   </label>    
                      
        </li>                  
    ))
  
}

export default CheckBox