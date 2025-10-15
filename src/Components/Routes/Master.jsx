import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import Home from '../Pages/Home';
import AboutUs from '../Pages/AboutUs';
import Students from '../Pages/Students';
import Class from '../Pages/Classes';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';

const Master = () => {
  return (
    <Router>
      <Routes>
        {/* Login & Register Form */}
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>

        {/* Main Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Default (index) page */}
            <Route index element={<Home />} />

            {/* Nested routes under /dashboard */}
            <Route path="AboutUs" element={<AboutUs />} />
            {/* <Route path="Students" element={<Students />} /> */}
            <Route path="students/:id" element={<Students />} />
            <Route path="Class" element={<Class />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default Master;
