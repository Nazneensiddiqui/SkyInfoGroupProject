import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 bg-white shadow-md rounded-xl">
      <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl shadow" />

      <div>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-600 text-lg mb-2">{product.description}</p>
        <p className="text-xl font-semibold text-indigo-600 mb-4">₹{product.price}</p>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500 mb-6">Category: {product.category}</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
