import React from "react";

const categories = [
  {
    title: "Music & Gaming",
    items: "10 Items",
    image: "/images/music.jpg",
  },
  {
    title: "Cameras",
    items: "10 Items",
    image: "/images/camera.jpg",
  },
  {
    title: "Smart TV",
    items: "10 Items",
    image: "/images/smarttv.jpg",
  },
  {
    title: "Smart Watches",
    items: "10 Items",
    image: "/images/smatwatch.jpg",
  },
];

const CategoryGrid = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-4 gap-10 border-b pb-6">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">{cat.title}</h4>
                <p className="text-sm text-gray-600">{cat.items}</p>
              </div>
              <img src={cat.image} alt={cat.title} className="w-24 h-24 mt-2" />
            </div>
          ))}
        </div>
        </div>
      </div>
   
  );
};

export default CategoryGrid;
