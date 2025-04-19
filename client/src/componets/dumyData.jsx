import React from "react";
import { FaShippingFast, FaGift, FaHeadphonesAlt, FaTags, FaCreditCard } from "react-icons/fa";

const TopFeatures = () => {
  const features = [
    {
      icon: <FaShippingFast size={24} />,
      title: "Free Shipping",
      desc: "From all orders over $5",
    },
    {
      icon: <FaGift size={24} />,
      title: "Daily Surprise Offers",
      desc: "Save upto 25% off",
    },
    {
      icon: <FaHeadphonesAlt size={24} />,
      title: "Support 24/7",
      desc: "Shop with an expert",
    },
    {
      icon: <FaTags size={24} />,
      title: "Affordable Prices",
      desc: "Get Factory Default Price",
    },
    {
      icon: <FaCreditCard size={24} />,
      title: "Secure Payments",
      desc: "100% Protected Payment",
    },
  ];

  return (
    <div className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-black">{item.icon}</span>
            <div>
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFeatures;
