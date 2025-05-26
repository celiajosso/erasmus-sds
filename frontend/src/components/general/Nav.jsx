import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="btn btn-circle btn-secondary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-2">
            <li>
              <Link
                to={`/favorites`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Favorites
              </Link>
            </li>
            <li>
              <Link
                to={`/playlists`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Playlists
              </Link>
            </li>
            <li>
              <Link
                to={`/planner`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                My Planner
              </Link>
            </li>
            <li>
              <Link
                to={`/`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
