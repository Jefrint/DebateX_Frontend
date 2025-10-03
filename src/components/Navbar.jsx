import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between bg-white shadow-md px-6 py-3 rounded-b-xl">
      {/* Left Side: Manorama Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://img-mm.manoramaonline.com/content/dam/mm/mo/revamp-logos/2024/mo-main-logo-web.svg" // replace with actual logo path
          alt="Manorama Online"
          className="h-6"
        />
        
      </div>

      {/* Right Side: Samvadam + Profile */}
      <div className="flex items-center gap-3">
        <span className="text-red-600 font-semibold text-lg">DebateX</span>
         {/* <img
          src="" // replace with actual profile image path
          alt="User Profile"
          className="h-8 w-8 rounded-full border border-gray-300"
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
