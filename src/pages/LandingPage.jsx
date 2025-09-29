import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        Welcome to <span className="text-yellow-300">MyApp</span>
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Build modern web applications faster with React and Tailwind CSS.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition">
          Get Started
        </button>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-200">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
