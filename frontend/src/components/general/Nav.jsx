import { useState } from 'react';
import NavItem from './NavItem';
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const token = localStorage.getItem("token");
  let username = null;

   if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub;
    } catch {
      username = null;
    }
  }

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

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
             <li className="py-2 border-b rounded-xl flex flex-col gap-2 px-3 lg:hidden">
              {!username ? (
                <>
                  <button className="btn btn-soft btn-info border-2 border-sky-500" onClick={() => { navigate("/register"); closeMenu(); }}>
                    Register
                  </button>
                  <button className="btn btn-soft btn-success border-2 border-green-500" onClick={() => { navigate("/login"); closeMenu(); }}>
                    Login
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-800">Welcome, <b>{username}</b></span>
                  <button className="btn btn-soft btn-error" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
