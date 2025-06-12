import { useState } from 'react';
import NavItem from './NavItem';
import { Bars3Icon } from '@heroicons/react/24/solid'



const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <button
        className="absolute top-6 right-6 btn btn-circle btn-secondary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
      <Bars3Icon className="size-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-6 top-20 w-44 bg-white rounded-xl shadow-lg z-10 border-x border-gray-800">
          <ul>
            <NavItem to="/" label="🌍 Explore Places" onClick={closeMenu} isFirst />
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
