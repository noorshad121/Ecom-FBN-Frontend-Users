import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
  const { products, Currency, cartItems, navigate, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-10 lg:px-24 py-12">
      <Title text1="YOUR" text2="CART" />

      {/* Cart Items */}
      <div className="mt-10 space-y-5">
        {cartData.map((item, index) => {
          const productData = products?.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="
                bg-white border border-gray-200
                rounded-2xl
                shadow-sm hover:shadow-md transition
                p-4 sm:p-5
                flex flex-col gap-4
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* LEFT */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
                
                {/* Image */}
                <div
                  className="
                    w-full h-52
                    sm:w-24 sm:h-24
                    lg:w-28 lg:h-28
                    bg-gradient-to-br from-gray-100 to-gray-200
                    rounded-xl
                    overflow-hidden
                    flex items-center justify-center
                  "
                >
                  <img
                    src={productData.image?.[0]}
                    alt={productData.name}
                    className="w-full h-full object-contain p-3"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-bold text-red-800">
                      {Currency}{productData.price}
                    </span>

                    <span className="px-3 py-1 border rounded-full text-xs">
                      Size: {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="
                    w-20
                    border border-gray-300
                    rounded-lg px-2 py-1
                    text-center font-medium
                    focus:outline-none
                    focus:ring-2 focus:ring-red-300
                  "
                />

                <img
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity - 1)
                  }
                  src={assets.bin_icon}
                  alt="Delete"
                  className="
                    w-5 cursor-pointer
                    opacity-70 hover:opacity-100 transition
                  "
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="
                bg-red-800 text-white
                text-sm my-8 px-8 py-3
                rounded-lg
                hover:bg-red-700
                active:scale-95 transition
              "
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;