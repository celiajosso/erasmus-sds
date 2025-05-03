import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]); // Store the list of favorite items
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage the dropdown menu state

  const apiUrl = process.env.REACT_APP_API_URL; 
  const userId = "user123"; // Temporary hardcoded user ID (should be dynamic later)

  // Fetch the user's favorite places from the API when the component mounts
  useEffect(() => {
    axios.get(`${apiUrl}/api/favorites`, { params: { userId } })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Failed to fetch favorites:", err));
  }, [apiUrl]);

  // Delete a favorite item by its ID
  const handleDelete = (favoriteId) => {
    console.log("Deleting favorite with ID:", favoriteId);
    axios.delete(`${apiUrl}/api/favorites/${favoriteId}`)
      .then(() => {
        // Update UI by filtering out the deleted favorite
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== favoriteId));
      })
      .catch((err) => {
        console.error("Failed to delete favorite:", err);
        alert("Failed to delete");
      });
  };

  return (
    <div className="p-6">
      {/* Page title and dropdown menu */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-center text-primary flex-1">⭐ Your Favorites</h1>
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
                  <Link to="/favorites" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    My Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/playlists" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    My Playlists
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Display favorite cards in a grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favorites.map((fav) => (
          <div key={fav.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <figure>
              <img
                src={fav.place.imageUrl}
                alt={fav.place.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback image if loading fails
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{fav.place.name}</h2>
              <div className="badge badge-secondary">{fav.place.category}</div>
              <div className="flex justify-between gap-4 mt-4">
                {/* Link to place details page */}
                <Link to={`/places/${fav.place.id}/details`} className="btn btn-primary">
                  See Details
                </Link>
                {/* Button to remove from favorites */}
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
    </div>
  );
};

export default FavoriteList;
