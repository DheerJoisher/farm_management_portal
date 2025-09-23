import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">MetaData</h2>
          <p className="mt-2 text-sm text-gray-400">
            Building modern web apps with React & Tailwind.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/" className="hover:text-blue-400">About</a></li>
            <li><a href="/" className="hover:text-blue-400">Services</a></li>
            <li><a href="/" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/forum" className="hover:text-blue-400">Forum</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-400"><Instagram /></a>
            <a href="#" className="hover:text-blue-400"><Github /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MetaData. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
