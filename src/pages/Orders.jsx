import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Link } from 'react-router-dom'
import Title from '../components/Title.jsx'
import axios from 'axios'

const Orders = () => {
  const { token, Currency, backendUrl } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const fetchOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrdersItems = []

        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })

        setOrderData(allOrdersItems.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      {orderData == ""?<p className="text-3xl text-gray-500">Empty item</p>
      :<div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex gap-4">
              <img className="w-25 sm:w-20 rounded" src={item.image[0]} alt={item.name} />

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>{Currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="mt-2">
                  Date: {new Date(item.date).toDateString()}
                </p>
                <p>payment:{item.paymentMethod}</p>
              </div>
            </div>

            <div className="flex md:w-1/2 justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm">{item.status}</p>
              </div>

              <button onClick={fetchOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default Orders
