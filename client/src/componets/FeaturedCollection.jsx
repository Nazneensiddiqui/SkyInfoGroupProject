import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const FeaturedCollection = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/product")
      .then((res) => {
        console.log("Backend Data:", res.data);
        // 👇 If API gives { products: [...] }, update this line
        setProducts(res.data.products || res.data); 
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4 relative hover:shadow-lg transition">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              <FaHeart />
            </button>
            <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-3" />
            <p className="text-sm text-red-500 font-semibold">{product.brand}</p>
            <p className="font-medium text-sm truncate">{product.title}</p>
            <div className="flex items-center my-1">
              {[...Array(5)].map((_, index) => (
                <MdStarRate
                  key={index}
                  className={`text-yellow-400 ${index < product.rating ? "" : "opacity-30"}`}
                />
              ))}
            </div>
            {product.oldPrice ? (
              <div className="text-sm">
                <span className="text-red-500 font-bold">${product.price}</span>
                <span className="line-through text-gray-500 ml-2">${product.oldPrice}</span>
              </div>
            ) : (
              <p className="font-semibold">${product.price}.00</p>
            )}
            {product.offer && (
              <span className="absolute top-2 left-2 text-xs bg-orange-400 text-white px-2 py-1 rounded">
                {product.offer}
              </span>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default FeaturedCollection;
