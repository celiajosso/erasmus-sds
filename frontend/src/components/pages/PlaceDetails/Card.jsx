export function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition duration-300 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Card;
