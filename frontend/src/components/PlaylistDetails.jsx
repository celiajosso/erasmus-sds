import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './general/Header';
import GoBack from './general/GoBack';



const PlaylistDetails = () => {
  const { id: playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/playlists/${playlistId}`)
      .then((res) => setPlaylist(res.data))
      .catch((err) => console.error("Failed to fetch playlist details:", err));
  }, [playlistId, apiUrl]);

  const handleRemovePlace = (placeId) => {
    

    axios
      .delete(`${apiUrl}/api/playlists/${playlistId}/places/${placeId}`)
      .then(() => {
        setPlaylist((prevPlaylist) => ({
          ...prevPlaylist,
          places: prevPlaylist.places.filter((place) => place.id !== placeId),
        }));
      })
      .catch((err) => {
        console.error("Failed to remove place from playlist:", err);
        alert("Failed to remove place from playlist. Please try again.");
      });
  };

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-6">
          <Header
        title={playlist.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {playlist.places.map((place) => (
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
              <div className="badge badge-secondary p-2">{place.category}</div>
              <div className="flex justify-between mt-4 gap-1 ">

              <Link to={`/places/${place.id}/details`} className="btn btn-primary">See Details</Link>
              <button
                className="btn btn-error "
                onClick={() => handleRemovePlace(place.id)}
              >
                Delete from {playlist.name}
              </button>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;