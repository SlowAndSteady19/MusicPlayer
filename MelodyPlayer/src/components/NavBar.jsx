import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">MelodyPlayer</div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/library" className="hover:text-yellow-400">
            Library
          </Link>
        </li>
        <li>
          <Link to="/playlists" className="hover:text-yellow-400">
            Playlists
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-yellow-400">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
