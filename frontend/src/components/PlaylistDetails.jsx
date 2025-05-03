import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
    if (!window.confirm("Are you sure you want to remove this place from the playlist?")) {
      return;
    }

    axios
      .delete(`${apiUrl}/api/playlists/${playlistId}/places/${placeId}`)
      .then(() => {
        setPlaylist((prevPlaylist) => ({
          ...prevPlaylist,
          places: prevPlaylist.places.filter((place) => place.id !== placeId),
        }));
        alert("Place removed from playlist successfully!");
      })
      .catch((err) => {
        console.error("Failed to remove place from playlist:", err);
        alert("Failed to remove place from playlist. Please try again.");
      });
  };

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-12">
      <h1 className="text-4xl font-bold text-center text-primary flex-1">{playlist.name}</h1>
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
                      {/* <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (isLoggedIn) {
                              setIsLoggedIn(false); // Déconnexion
                            } else {
                              setShowAuthModal(true); // Ouvre le modal de connexion
                            }
                          }}
                        >
                          {isLoggedIn ? 'Déconnexion' : 'Connexion'}
                        </button>
                      </li> */}
                    </ul> 
      
                  </div>
                )}
              </div>
            </div>



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
              <div className="badge badge-secondary">{place.category}</div>
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