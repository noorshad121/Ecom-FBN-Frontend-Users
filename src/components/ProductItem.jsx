import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import {Link} from "react-router-dom"


const PRoductItem = ({id, image, name, price}) => {
    const { Currency} = useContext(ShopContext)
  return (
   <Link className='text-gray-700 cursor-pointer gap-3' to={`/product/${id}`}>
    <div className='overflow-hidden'>
        <img className='hover:scale-110 transition h-60 w-60 rounded bg-cover ease-in-out' src={image[0]} alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{Currency}{price}</p>
   </Link>
  )
}

export default PRoductItem
