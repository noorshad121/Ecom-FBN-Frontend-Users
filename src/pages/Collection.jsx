import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext.jsx"
import { assets } from '../assets/assets.js'
import Title from "../components/Title.jsx"
import ProductItem from "../components/ProductItem.jsx"

const Collection = () => {

  const { products, search, showSearch} = useContext(ShopContext)

  const [showFilter, setShowfilter] = useState(true)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sort, setSort] = useState("");

  // CATEGORY TOGGLE
  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // search start 
  useEffect(() => {
  let filtered = products

  if (search && search.trim() !== "") {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (category.length > 0) {
    filtered = filtered.filter(item =>
      category.includes(item.category)
    )
  }

  if (subCategory.length > 0) {
    filtered = filtered.filter(item =>
      subCategory.includes(item.subCategory)
    )
  }

  setFilterProducts(filtered)
}, [products, category, subCategory, search])

  // search end


  // -----------------shorted by price-----------
  const handleChangePrice = (e) => {
  const value = e.target.value

  if (value === "low-to-high") {
    filterProducts.sort((a, b) => a.price - b.price)
  }

 else if (value === "high-to-low") {
    filterProducts.sort((a, b) => b.price - a.price)
  }
  else {
    filterProducts.sort((a, b)=> a-b);
  }
  setSort(value)
}


  // end shorted by price

  // SUBCATEGORY TOGGLE
  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

useEffect(()=>{
 let filtered = products

    if (category.length > 0) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      )
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    setFilterProducts(filtered)
  }, [products, category, subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTERS */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowfilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Men', 'Women', 'Kids'].map(item => (
              <label key={item} className='flex gap-2'>
                <input type="checkbox" value={item} onChange={toggleCategory} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(item => (
              <label key={item} className='flex gap-2'>
                <input type="checkbox" value={item} onChange={toggleSubCategory} />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1="ALL" text2="COLLECTIONS" />

          <select onChange={handleChangePrice} className='border-2 border-gray-300 text-sm px-2 outline-none'>
            <option value="">Sort by: Relevant</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map(item => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Collection
