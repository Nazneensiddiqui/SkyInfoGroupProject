// import React from "react";
// import { FaSearch, FaSyncAlt, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-900 text-white px-6 py-2">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-2">
//         <span>Free Shipping Over $100 & Free Returns</span>
//         <span>Hotline: (888) 4344 6000 - (888) 1338 8193</span>
//       </div>
      
//       {/* Main Navbar */}
//       <div className="flex justify-between items-center py-4">
//         {/* Logo */}
//         <h1 className="text-2xl font-bold">Digtic.</h1>
        
//         {/* Search Bar */}
//         <div className="flex border border-gray-600 rounded-md overflow-hidden w-1/3">
//           <input type="text" placeholder="Search Product Here..." className="p-2 w-full bg-gray-800 text-white outline-none" />
//           <button className="bg-orange-500 p-2"><FaSearch /></button>
//         </div>
        
//         {/* Icons */}
//         <div className="flex items-center space-x-10">
//           <div className="flex items-center space-x-2 cursor-pointer"><FaSyncAlt /><span>Compare <br /> Products</span></div>
//           <div className="flex items-center space-x-2 cursor-pointer"><FaHeart /><span>Favourite<br/> Wishlist</span></div>
//           <div className="flex items-center space-x-2 cursor-pointer"><FaUser /><span>Log In<br /><span className="text-xs">My Account</span></span></div>
//           <div className="flex items-center space-x-2 cursor-pointer relative">
//             <FaShoppingCart />
//             <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-2">0</span>
//             <span>$0.00</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Bottom Navbar */}
//       <div className="flex items-center space-x-6 py-2 border-t border-gray-700">
//         <div className="flex items-center cursor-pointer space-x-1">
//           <span className="text-lg">☰</span>
//           <span>SHOP CATEGORIES</span>
//           <IoIosArrowDown />
//         </div>
//         <div className="flex space-x-6">
//           <a as={Link} to="home" className="hover:text-orange-500">HOME</a>
//           <a as={Link} to="ourstore" className="hover:text-orange-500">OUR STORE</a>
//           <a as={Link} to="blogs" className="hover:text-orange-500">BLOGS</a>
//           <a as={Link} to="contact" className="hover:text-orange-500">CONTACT</a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { FaSearch, FaSyncAlt, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-2">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-2">
        <span>Free Shipping Over $100 & Free Returns</span>
        <span>Hotline: (888) 4344 6000 - (888) 1338 8193</span>
      </div>

      {/* Main Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Digtic.</h1>

        {/* Search Bar */}
        <div className="flex border border-gray-600 rounded-md overflow-hidden w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Product Here..."
            className="p-2 w-full bg-gray-800 text-white outline-none"
          />
          <button className="bg-orange-500 p-2">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/compare" className="flex items-center space-x-2 cursor-pointer hover:text-orange-400">
            <FaSyncAlt />
            <span className="text-xs text-center">Compare<br />Products</span>
          </Link>
          <Link to="/wishlist" className="flex items-center space-x-2 cursor-pointer hover:text-orange-400">
            <FaHeart />
            <span className="text-xs text-center">Favourite<br />Wishlist</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 cursor-pointer hover:text-orange-400">
            <FaUser />
            <span className="text-xs text-center">Log In<br /><span className="text-xs">My Account</span></span>
          </Link>
          <Link to="/cartpage" className="flex items-center space-x-2 cursor-pointer relative hover:text-orange-400">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full px-2">0</span>
            <span>$0.00</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="flex items-center space-x-6 py-2 border-t border-gray-700">
        <div className="flex items-center cursor-pointer space-x-1 hover:text-orange-500">
          <span className="text-lg">☰</span>
          <span>SHOP CATEGORIES</span>
          <IoIosArrowDown />
        </div>
        <div className="flex space-x-6 text-sm">
          <Link to="/home" className="hover:text-orange-500">HOME</Link>
          <Link to="/ourstore" className="hover:text-orange-500">OUR STORE</Link>
          <Link to="/blogs" className="hover:text-orange-500">BLOGS</Link>
          <Link to="/contact" className="hover:text-orange-500">CONTACT</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
