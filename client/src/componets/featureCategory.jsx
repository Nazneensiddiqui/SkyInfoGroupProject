import React from "react";

const features = [
  {
    icon: "🚚",
    title: "Free Shipping",
    subtitle: "From all orders over $5",
  },
  {
    icon: "🎁",
    title: "Daily Surprise Offers",
    subtitle: "Save upto 25% off",
  },
  {
    icon: "🎧",
    title: "Support 24/7",
    subtitle: "Shop with an expert",
  },
  {
    icon: "⚙️",
    title: "Affordable Prices",
    subtitle: "Get Factory Default Price",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    subtitle: "100% Protected Payment",
  },
];



const FeaturesAndCategories = () => {
  return (
    <div className="bg-gray-100 py-8">
      {/* Top Feature Bar */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <div className="text-2xl">{feature.icon}</div>
            <h3 className="font-semibold text-sm">{feature.title}</h3>
            <p className="text-xs text-gray-600">{feature.subtitle}</p>
          </div>
        ))}
      </div>

      
        </div>
   
  );
};

export default FeaturesAndCategories;
