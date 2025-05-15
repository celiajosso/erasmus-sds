import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = "user123"; 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
  

  useEffect(() => {
    axios.get(`${apiUrl}/api/favorites`, { params: { userId } })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Failed to fetch favorites:", err));
  }, [apiUrl]);

  const handleDelete = (favoriteId) => {
    console.log("Deleting favorite with ID:", favoriteId);
  
    axios.delete(`${apiUrl}/api/favorites/${favoriteId}`)
        .then(() => {
          setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== favoriteId));
        })
        .catch((err) => {
          console.error("Failed to delete favorite:", err);
        });
  };
  

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-center text-primary text-red-400 flex-1">Your Favorites</h1>
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
      </div>
  
      {favorites.length === 0 ? (
  <div className="flex flex-col items-center justify-center mt-20 text-red-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 mb-4 animate-pulse"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <p className="text-xl font-semibold">No favorites yet</p>
    <p className="text-gray-400 mt-1">Add some places to your favorites to see them here.</p>
    <Link to={`/`} className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition">Explore place</Link>

  </div>
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure>
                <img
                  src={fav.place.imageUrl}
                  alt={fav.place.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{fav.place.name}</h2>
                <div className="badge badge-secondary">{fav.place.category}</div>
                <div className="flex justify-between gap-4 mt-4">
                  <Link to={`/places/${fav.place.id}/details`} className="btn btn-primary">
                    See Details
                  </Link>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(fav.id)}
                  >
                    Delete from Favorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default FavoriteList;
