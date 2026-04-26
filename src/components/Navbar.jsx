import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("debatex_token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      localStorage.removeItem("debatex_token");
      sessionStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between bg-white shadow-md px-6 py-3 rounded-b-xl">
      
      
      <div className="flex items-center gap-2">
        <img
          src="https://img-mm.manoramaonline.com/content/dam/mm/mo/revamp-logos/2024/mo-main-logo-web.svg"
          alt="Manorama Online"
          className="h-6"
        />
      </div>

      
      <div className="flex items-center gap-4">
        <span className="text-red-600 font-semibold text-lg">DebateX</span>

        
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;