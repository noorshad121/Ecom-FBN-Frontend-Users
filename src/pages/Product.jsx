import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, Currency, addToCart, token } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  const handleAddToCart = () => {
    if (!token) return toast.error("Please login first");
    if (!size) return toast.error("Please select a size");
    addToCart(productData._id, size);
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-auto sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full mb-3 ml-1 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full" alt="" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium">
            {Currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500">{productData.description}</p>

          <div className="my-8">
            <p>Select Size</p>
            <div className="flex gap-2 mt-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${
                    size === item ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm"
          >
            ADD TO CART
          </button>

          <hr className="mt-8" />

          <div className="text-sm text-gray-500 mt-5">
            <p>100% Original product.</p>
            <p>Cash on Delivery available.</p>
            <p>7 days return policy.</p>
          </div>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
