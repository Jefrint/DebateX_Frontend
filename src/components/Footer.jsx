import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="  flex flex-col md:flex-row items-center justify-between">
   
        <div className="flex space-x-4 mb-3 md:mb-0">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-pink-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-red-500 transition"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-400 transition"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
        </div>

        {/* Right - Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} DebateX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
