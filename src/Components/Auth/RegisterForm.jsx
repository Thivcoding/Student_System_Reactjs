import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_School.webp";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://192.168.0.127:8000/api/register", formData,
      );

      setMessage("✅ Registration successful!");
      console.log(response.data);

      // redirect to login page after register success
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data.message || "Registration failed"}`);
      } else {
        setMessage("❌ Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="rounded-xl shadow-lg p-8 w-full max-w-lg bg-gradient-to-l from-violet-900 via-violet-800 to-violet-700">
        <div className="flex flex-col items-center mb-5">
          <img className="w-[100px]" src={logo} alt="Logo" />
          <h2 className="text-2xl font-bold text-center text-white py-3">
            Create Account
          </h2>
          <p className="text-gray-300">Fill in your details to register</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-white">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-1 text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full mt-1 text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {message && (
            <p className="text-center text-sm text-yellow-300 font-semibold">{message}</p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Register
          </button>

          <p className="text-center text-gray-200 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
