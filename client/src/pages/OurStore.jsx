import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"


const OurStore = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/products").then((res) => {
        setProducts(res.data);
      });
    }, []);

    return (
        <>
       <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r bg-white">
        <div className="mb-6">
          <h3 className="font-semibold">Shop By Categories</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>Watch</li>
            <li>Tv</li>
            <li>Camera</li>
            <li>Laptop</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Filter By</h3>
          <div className="mt-2">
            <p className="text-sm">Availability</p>
            <label className="block text-sm">
              <input type="checkbox" className="mr-2" /> In Stock (1)
            </label>
            <label className="block text-sm">
              <input type="checkbox" className="mr-2" /> Out of Stock (0)
            </label>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm">Price</p>
          <div className="flex gap-2 mt-2">
            <input
              className="border w-1/2 p-1 text-xs"
              placeholder="From"
              type="number"
            />
            <input
              className="border w-1/2 p-1 text-xs"
              placeholder="To"
              type="number"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm">Colors</p>
          <div className="flex flex-wrap mt-2 gap-2">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className="w-4 h-4 bg-red-600 rounded-full inline-block"
                ></span>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm">Size</p>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" /> S (2)
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" /> M (2)
          </label>
        </div>

        <div>
          <p className="font-semibold text-sm">Product Tags</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Headphone", "Laptop", "Mobile", "Wire"].map((tag) => (
              <span
                key={tag}
                className="border px-2 py-1 text-xs bg-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <div className="flex-1 p-4">
        {/* Sort + Count */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Sort By:</span>
            <select className="border p-1 text-sm">
              <option>Best selling</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>
          <div className="text-sm">{products.length} Products</div>
        </div>

        {/* Product Cards */}
        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border p-4 bg-white shadow-sm relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs text-orange-600 font-medium">{item.brand}</p>
                  <p className="font-semibold text-sm leading-5">{item.title}</p>
                </div>
                <div className="text-yellow-500 text-sm mt-1">
                  {"⭐".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                </div>
                <p className="font-semibold text-sm mt-1">${item.price}</p>
              </div>
              <div className="absolute top-2 right-2 cursor-pointer text-gray-400 text-xl">
                ♡
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </>
      );
    };

    export default OurStore
