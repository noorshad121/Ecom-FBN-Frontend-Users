import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div >
       <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
       </div>
       <div className='my-10 flex flex-col justify-center items-center md:flex-row gap-20 mb-28'>
        <img className='w-full md:w-[480px] rounded' src={assets.contact_img} alt="" />
        <div className='flex flex-col  items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600' >Our Store</p>
          <p className='text-gray-500'>57546 Willms Station <br /> Suite 350, delhi, india</p>
          <p className='text-gray-500'>Tel:(+91) 555-344 <br /> Email: fbnStore@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at FBN_Stores</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-red-600 px-8 py-4 bg-gray-400 rounded text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
       </div>
       <NewsletterBox />
    </div>
  )
}

export default Contact
