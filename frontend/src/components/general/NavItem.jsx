import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ isFirst, to, label, onClick, isLast }) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`block p-2 text-gray-800 hover:bg-gray-100
          border-b ${isFirst ? 'border-t rounded-t-xl' : ''} 
          ${isLast ? 'rounded-b-xl' : ''}
          ${!isLast ? 'border-gray-500 border-xl' : ''}
        `}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
