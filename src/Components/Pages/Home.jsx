import React from 'react';
import schoolLogo from '../../assets/Logo_School.webp';

const Home = () => {
  return (
    <div className='p-8'>
      {/* Welcome Banner */}
      <div className="bg-violet-100 rounded-lg p-6 flex items-center gap-6 shadow-md mb-8 ">
        <img src={schoolLogo} alt="School Logo" className="w-28 h-28 rounded-lg object-cover shadow" />
        <div>
          {/* <h1 className="text-3xl font-bold text-violet-900 mb-2">Welcome to HOK VANTHIV School</h1>
          <p className="text-gray-700 text-lg">
            At HOK VANTHIV School, we provide quality education and nurture students...
          </p> */}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-violet-900 mb-4">About Our School</h2>
        <p className="text-gray-700 leading-relaxed">
          Our school has a rich history of academic excellence and community involvement...
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-violet-100 rounded-lg p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-violet-900 mb-2">Vision</h3>
          <p className="text-gray-700">To become a leading school recognized for excellence in education, innovation, and character development.</p>
        </div>
        <div className="bg-violet-100 rounded-lg p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-violet-900 mb-2">Mission</h3>
          <p className="text-gray-700">To provide a nurturing and challenging environment that promotes academic excellence, critical thinking, creativity, and social responsibility.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
