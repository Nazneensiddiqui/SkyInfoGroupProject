import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 md:px-16 py-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Demo Store</p>
          <p>No. 1259 Freedom, New York, 11111</p>
          <p>United States</p>
          <p className="mt-2">+91-987654321</p>
          <p>Demo@Exampledemo.Com</p>
          <div className="flex space-x-3 mt-4">
            <FaTwitter className="cursor-pointer hover:text-orange-500" />
            <FaFacebookF className="cursor-pointer hover:text-orange-500" />
            <FaPinterestP className="cursor-pointer hover:text-orange-500" />
            <FaInstagram className="cursor-pointer hover:text-orange-500" />
            <FaYoutube className="cursor-pointer hover:text-orange-500" />
          </div>
        </div>

        {/* Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Information</h2>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Shipping Policy</li>
            <li>Terms Of Service</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <ul className="space-y-2 text-sm">
            <li>Search</li>
            <li>About Us</li>
            <li>Faq</li>
            <li>Contact</li>
            <li>Size Chart</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>Accessories</li>
            <li>Laptops</li>
            <li>Headphones</li>
            <li>Smart Watches</li>
            <li>Tablets</li>
          </ul>
        </div>

        {/* Our App */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Our App</h2>
          <p className="text-sm mb-3">Download our App and get extra 15% Discount on your first Order.!</p>
          <div className="flex space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10 cursor-pointer"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 text-sm text-gray-400">
        <p>© 2022, Digtic Powered by Shopify</p>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
            alt="MasterCard"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
            alt="Amex"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Maestro_logo.svg"
            alt="Maestro"
            className="h-6"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Discover_Card_logo.svg"
            alt="Discover"
            className="h-6"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
