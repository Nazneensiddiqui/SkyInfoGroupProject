import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", phone: "", password: "" });
    setMsg("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8000/api/user/login"
      : "http://localhost:8000/api/user/register";

    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await axios.post(url, dataToSend);
      setMsg(res.data.message || "Success");
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create an Account 🎉"}
        </h2>

        {msg && (
          <p className="text-center mb-4 text-sm text-red-500 font-medium">
            {msg}
          </p>
        )}

        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="1234567890"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-center mt-5 text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={handleToggle}
          >
            {isLogin ? "Signup here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
