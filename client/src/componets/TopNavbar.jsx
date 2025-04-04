import React from "react";
import { FaSearch, FaSyncAlt, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-2">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-2">
        <span>Free Shipping Over $100 & Free Returns</span>
        <span>Hotline: (888) 4344 6000 - (888) 1338 8193</span>
      </div>
      
      {/* Main Navbar */}
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Digtic.</h1>
        
        {/* Search Bar */}
        <div className="flex border border-gray-600 rounded-md overflow-hidden w-1/3">
          <input type="text" placeholder="Search Product Here..." className="p-2 w-full bg-gray-800 text-white outline-none" />
          <button className="bg-orange-500 p-2"><FaSearch /></button>
        </div>
        
        {/* Icons */}
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2 cursor-pointer"><FaSyncAlt /><span>Compare <br /> Products</span></div>
          <div className="flex items-center space-x-2 cursor-pointer"><FaHeart /><span>Favourite<br/> Wishlist</span></div>
          <div className="flex items-center space-x-2 cursor-pointer"><FaUser /><span>Log In<br /><span className="text-xs">My Account</span></span></div>
          <div className="flex items-center space-x-2 cursor-pointer relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-2">0</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Navbar */}
      <div className="flex items-center space-x-6 py-2 border-t border-gray-700">
        <div className="flex items-center cursor-pointer space-x-1">
          <span className="text-lg">☰</span>
          <span>SHOP CATEGORIES</span>
          <IoIosArrowDown />
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-orange-500">HOME</a>
          <a href="#" className="hover:text-orange-500">OUR STORE</a>
          <a href="#" className="hover:text-orange-500">BLOGS</a>
          <a href="#" className="hover:text-orange-500">CONTACT</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;