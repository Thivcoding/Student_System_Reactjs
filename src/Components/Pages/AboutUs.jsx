import React from 'react';
import { FaUsers, FaLightbulb, FaGlobe } from 'react-icons/fa';
import DashboardLayout from '../Layouts/DashboardLayout';

const AboutUs = () => {
  return (
      <div className="min-h-full bg-background p-8">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <h1 className="text-5xl font-extrabold mb-4 text-foreground">About Us</h1>
          <p className="text-lg max-w-xl mx-auto text-muted-foreground text-pretty">
            We are a team passionate about technology, innovation, and creating solutions that make life easier for
            everyone.
          </p>
        </section>

        {/* Info Cards */}
        <section className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 mb-20">
          <div className="bg-card/20 backdrop-blur-md border border-border/50 rounded-xl p-6 w-64 text-center hover:scale-105 transform transition duration-300">
            <FaUsers size={40} className="mx-auto mb-4 text-chart-1" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Our Team</h2>
            <p className="text-muted-foreground">Dedicated professionals committed to delivering quality solutions.</p>
          </div>
          <div className="bg-card/20 backdrop-blur-md border border-border/50 rounded-xl p-6 w-64 text-center hover:scale-105 transform transition duration-300">
            <FaLightbulb size={40} className="mx-auto mb-4 text-chart-2" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Our Vision</h2>
            <p className="text-muted-foreground">
              Innovating and inspiring new ideas that shape the future of technology.
            </p>
          </div>
          <div className="bg-card/20 backdrop-blur-md border border-border/50 rounded-xl p-6 w-64 text-center hover:scale-105 transform transition duration-300">
            <FaGlobe size={40} className="mx-auto mb-4 text-chart-3" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Global Reach</h2>
            <p className="text-muted-foreground">Connecting with people worldwide to create impactful experiences.</p>
          </div>
        </section>
      </div>
  );
};

export default AboutUs;
