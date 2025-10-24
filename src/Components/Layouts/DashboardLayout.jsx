import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [showModal, setShowModal] = useState(false);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 1) return <Navigate to="/login" />;

  // បង្ហាញ modal ពេលចូល
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[19%] w-full bg-gray-100">
        <Outlet />

        {/* Modal Cool Design */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-8 py-12 rounded-3xl shadow-2xl max-w-lg text-center relative"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <FaCheckCircle className="text-5xl text-green-300 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-lg text-gray-100 mb-6">
                  Hello <span className="font-semibold text-yellow-300">{user.name}</span>,  
                  you’ve successfully entered the Admin Dashboard 🚀
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-white cursor-pointer text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition-all duration-300"
                >
                  Let’s Start
                </button>

                {/* Floating Effect Circle */}
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardLayout;
