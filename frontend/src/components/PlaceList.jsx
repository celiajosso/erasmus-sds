import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/places`)
      .then((res) => {
        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">🌍 Explore Places</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {places.map((place) => (
          <Link to={`/places/${place.id}/details`}>
            <div key={place.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
              <figure>
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{place.name}</h2>
                <div className="badge badge-secondary">{place.category}</div>
                <div className="btn btn-primary mt-4">See Details</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
