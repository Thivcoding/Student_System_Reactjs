import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_School.webp";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
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
        const response = await axios.post(
          "http://192.168.0.127:8000/api/login",
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: false,
          }
        );

        const { token, user } = response.data;

        console.log("Full API Response:", response.data);

        // ✅ Store token and user in localStorage (standard keys)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Set default header for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setMessage("✅ Login successful!");
        console.log("Token:", token);
        console.log("User:", user);

        // ✅ Redirect to dashboard
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("❌ Invalid email or password");
        } else {
          setMessage("❌ Server connection error");
        }
      }
    };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="rounded-xl shadow-lg p-8 w-full max-w-lg bg-gradient-to-l from-violet-900 via-violet-800 to-violet-700">
        <div className="flex flex-col items-center mb-5">
          <img className="w-[100px]" src={logo} alt="logo" />
          <h2 className="text-2xl font-bold text-center text-white py-3">
            Welcome Back
          </h2>
          <p className="text-gray-300">Login to continue</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter your password"
              className="w-full mt-2 text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {message && (
            <p className="text-center text-yellow-200 font-semibold mt-2">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>

          <p className="text-center text-gray-200 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
