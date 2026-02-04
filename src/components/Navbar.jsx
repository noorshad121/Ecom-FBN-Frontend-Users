import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const handleLogout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
    <h1 className="text-2xl font-extrabold uppercase tracking-widest">
  <span className="text-red-500">FBN</span>{" "}
  <span className="text-blue-500">CLOTHES</span>
</h1>



      <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
        />

        {/* profile */}
        <div className="relative">
          {token ? (
            <>
              <img
                className="w-5 cursor-pointer"
                src={assets.profile_icon}
                alt=""
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <div
                className={`absolute right-0 pt-4 w-36 bg-slate-100 text-gray-500 rounded flex flex-col gap-2 ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <p className="cursor-pointer onClick={() =>  hover:text-black">
                  My Profile
                </p>
                <Link to="/orders" className="cursor-pointer hover:text-black">
                  Orders
                </Link>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  LogOut
                </p>
              </div>
            </>
          ) : (
            <Link to="/login">
              <img
                className="w-5 cursor-pointer"
                src={assets.login_icon}
                alt=""
              />
            </Link>
          )}
        </div>

        {/* cart */}
        <Link to="/cart" className="relative flex items-center">
          <img
            className="w-5 cursor-pointer"
            src={assets.cart_icon}
            alt="cart"
          />
          <p className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {getCartCount()}
          </p>
        </Link>

        {/* menu icon (OPEN sidebar) */}
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
