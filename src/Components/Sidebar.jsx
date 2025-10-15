import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo_School.webp';
import user_logo from '../assets/User-logo.png';
import { MdHomeWork, MdAddHome } from "react-icons/md";
import { FaUserGraduate, FaUserCog } from "react-icons/fa";
import { RiCornerUpRightFill } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

    // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className='w-[19%] bg-gradient-to-l fixed top-0 left-0 z-50 from-violet-900 via-violet-800 to-violet-700 h-screen'>
      <div className='px-6 py-4'>
        {/* Header */}
        <div className='flex justify-center h-24 border-b border-gray-300'>
          <img src={logo} className='w-[100px] h-full object-cover' alt="" />
        </div>

        {/* Admin Info */}
        <div className='flex gap-3 items-center h-24 border-b border-gray-300 mt-2'>
          <div className='w-[65px] rounded-full p-2 bg-white'>
            <img src={user_logo} className='w-full h-full object-cover' alt="" />
          </div>
          <div className='font-bold text-white'>
            <h1 className=''>Name: {user?.name || "Loading..."}</h1>
            <h1 className=''>ID: <span className='text-pink-500'>{user?.id || "---"}</span></h1>
          </div>
        </div>

        {/* Menu */}
        <ul className='mt-4 space-y-2'>
          <li>
            <NavLink end  to='/dashboard' className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2 rounded font-bold text-white transition-colors duration-300 ${
                isActive ? 'bg-violet-900' : 'hover:bg-violet-800'
              }`}>
              <MdHomeWork size={24}/> Home
            </NavLink>
          </li>

          <li className='cursor-pointer' onClick={() => setDropdown(!dropdown)}>
            <div className='flex justify-between items-center px-3 py-2 text-white font-bold'>
              <div className='flex gap-4 items-center'><FaUserGraduate size={22}/> Instructor</div>
              <RiCornerUpRightFill className={`${dropdown ? 'rotate-90' : 'rotate-0'} transition-all`} size={25} />
            </div>
          </li>

          {dropdown && (
            <li className='pl-8'>
              <NavLink to='/dashboard/Class' className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2 rounded font-bold text-white transition-colors duration-300 ${
                  isActive ? 'bg-violet-900' : 'hover:bg-violet-800'
                }`}>
                <MdAddHome size={24}/> Class
              </NavLink>
            </li>
          )}

          <li className='border-b border-white'>
            <NavLink to='/dashboard/AboutUs' className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2 rounded font-bold text-white transition-colors duration-300 ${
                isActive ? 'bg-violet-900' : 'hover:bg-violet-800'
              }`}>
              <FaUserCog size={24}/> About Us
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
        className='absolute left-6 bottom-10 flex items-center justify-center gap-3 w-[80%] mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
          <BiLogOut size={24}/> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
