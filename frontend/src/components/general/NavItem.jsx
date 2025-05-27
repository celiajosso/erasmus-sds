import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ isFirst, to, label, onClick, isLast }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`block p-2 text-gray-800 hover:bg-gray-100
          border-b ${isFirst ? 'border-t rounded-t-xl' : ''} 
          ${isLast ? 'rounded-b-xl' : ''}
          ${!isLast ? 'border-gray-500 border-xl' : ''}
          ${isActive ? 'font-bold text-black' : 'text-gray-800'}
        `}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
