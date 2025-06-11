import Nav from './Nav';

const Header = ({ title, isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white flex-1">{title}</h1>
      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
