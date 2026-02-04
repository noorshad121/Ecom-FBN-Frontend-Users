import React from 'react'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets.js'
import NewsLetterBox from "../components/NewsletterBox.jsx"

const About = () => {
  return (
   <div>
     <div className='text-2xl text-center pt-8 border-t'>
       <Title text1={'ABOUT'} text2={'US'} />
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[550px] md:max-h-[600px] rounded' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate fugit repudiandae nam exercitationem pariatur odio culpa quia, non omnis. Est nulla rem voluptate laudantium nostrum omnis culpa dolore quia atque?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius molestias sed vel, ab blanditiis ipsum, illo ullam eum ad accusamus adipisci sequi vero, reprehenderit repellendus quaerat libero inventore alias ducimus.</p>
        <b className='text-gray-800'>OUR Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eum enim! Quam delectus aliquid earum hic reiciendis ut. Consequatur et ex temporibus numquam facilis culpa rerum fuga eos repellat veritatis!</p>
      </div>
    </div>
     <div className='text-2xl py-4'>
      < Title text1={'WHY'} text2={'CHOOSE US'} />
     </div>
     <div className='flex flex-col md:flex-row text-sm mb-20'>
       <div className='border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid iusto dolores nobis, assumenda tenetur nam sit molestias enim, repellat, reiciendis esse. Obcaecati quis et sint nostrum accusantium quos esse voluptatum.</p>
       </div>
       <div className='border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid iusto dolores nobis, assumenda tenetur nam sit molestias enim, repellat, reiciendis esse. Obcaecati quis et sint nostrum accusantium quos esse voluptatum.</p>
       </div>
       <div className='border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid iusto dolores nobis, assumenda tenetur nam sit molestias enim, repellat, reiciendis esse. Obcaecati quis et sint nostrum accusantium quos esse voluptatum.</p>
       </div>
     </div>
     <NewsLetterBox />
   </div>

  )
}

export default About
