import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = "user123"; 

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
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">⭐ Your Favorites</h1>
        <Link to={`/`} className="btn btn-secondary">Back</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favorites.map((fav) => (
          <div key={fav.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
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
    </div>
  );
};

export default FavoriteList;
