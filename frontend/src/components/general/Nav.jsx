import React, { useState } from 'react';
import NavItem from './NavItem';
import { Bars3Icon } from '@heroicons/react/24/solid'



const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative">
      <button
        className="btn btn-circle btn-secondary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
      <Bars3Icon className="size-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-10">
          <ul>
            <NavItem to="/" label="🌍 Explore Places" onClick={closeMenu} />
            <NavItem to="/planner" label="🗓️ Plan My Trip" onClick={closeMenu} />
            <NavItem to="/favorites" label="📍 My Favorites" onClick={closeMenu} />
            <NavItem to="/playlists" label="🧭 My Playlists" onClick={closeMenu} isLast />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
