import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from "../components/Title.jsx"

const CartTotal = () => {

  const {Currency, getCartAmount, delivery_fee} = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        < Title text1={'CART'} text2={'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{Currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{Currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Total</p>
          <b>{Currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
        
      </div>
      
    </div>
  )
}

export default CartTotal
