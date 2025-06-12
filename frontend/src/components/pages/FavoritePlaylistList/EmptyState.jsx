import { Link } from "react-router-dom";

const EmptyState = ({ icon, title, subtitle, iconClassName }) => (
  <div className="flex flex-col items-center justify-center mt-20 text-gray-800 dark:text-white">
    {icon && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-20 w-20 mb-4 animate-pulse ${iconClassName || ""}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="none"
      >
        {icon}
      </svg>
    )}
    <p className="text-xl font-semibold">{title}</p>
    <p className="text-gray-400 mt-1">{subtitle}</p>
    <Link
      to="/"
      className="mt-6 px-6 py-2 bg-white hover:bg-gray-200 text-black border border-gray-800 rounded-xl"
    >
      Explore places
    </Link>
  </div>
);

export default EmptyState;
