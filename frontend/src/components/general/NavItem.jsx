import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, label, onClick, isLast }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`block p-2 hover:bg-gray-100 ${
          isActive ? 'font-bold text-gray-900' : 'text-gray-800'
        } ${isLast ? '' : 'border-b border-gray-500'}`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
