import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetterBox from "../components/NewsletterBox.jsx";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[550px] md:max-h-[600px] rounded"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600">
          <p>
            FBN Clothes is a modern fashion brand focused on delivering stylish,
            comfortable, and affordable clothing for everyone.
          </p>
          <p>
            Our goal is to make trendy fashion accessible without compromising
            on quality. We carefully curate our collections to match the latest
            trends while ensuring long-lasting comfort.
          </p>
          <b className="text-gray-800">OUR Mission</b>
          <p>
            Our mission is to empower individuals through fashion by providing
            high-quality apparel at competitive prices. We aim to create a
            seamless and enjoyable shopping experience for our customers.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We ensure premium fabric quality and strict quality checks before
            delivering products to our customers.
          </p>
        </div>
        <div className="border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Enjoy a smooth and hassle-free shopping experience with secure
            payments and easy returns.
          </p>
        </div>
        <div className="border p-10 md:px-16 py-8 ms:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated support team is always ready to assist you with quick
            responses and reliable solutions.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
