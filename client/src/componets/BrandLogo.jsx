import React from 'react';

const brands = [
  { name: 'SanDisk', image: '/images/sandisk.svg' },
  { name: 'Dell', image: '/images/dell.webp' },
  { name: 'LG', image: '/images/lg.webp' },
  { name: 'Bose', image: '/images/bose.jpg' },
  { name: 'Samsung', image: '/images/samsung.webp' },
  { name: 'Canon', image: '/images/canon.png' },
  { name: 'Apple', image: '/images/apply.png' },
];

const Brands = () => {
  return (
    <div className="bg-white shadow rounded-xl px-10 py-6 flex flex-wrap justify-center gap-10">
      {brands.map((brand, index) => (
        <img
          key={index}
          src={brand.image}
          alt={brand.name}
          className="h-12 object-contain"
        />
      ))}
    </div>
  );
};

export default Brands;
