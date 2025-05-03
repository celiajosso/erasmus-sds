import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = "user123";

  // Fetch playlists data on component mount
  useEffect(() => {
    axios.get(`${apiUrl}/api/playlists`, { params: { userId } })
      .then((res) => setPlaylists(res.data))  
      .catch((err) => console.error("Failed to fetch playlists:", err));  
  }, [apiUrl]);

  const handleDeletePlaylist = (playlistId) => {
    console.log("Deleting playlist with ID:", playlistId);

    // Send DELETE request to delete the playlist
    axios.delete(`${apiUrl}/api/playlists/${playlistId}`)
      .then(() => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.id !== playlistId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete playlist:", err);
        alert("Failed to delete playlist. Please try again.");  
      });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-center text-primary flex-1">🎵 Your Playlists</h1>
        
        {/* Button to toggle the visibility of the menu */}
        <div className="relative">
          <button
            className="btn btn-circle btn-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          >
            ☰
          </button>
          
          {/* Display menu if it's open */}
          {isMenuOpen && ( 
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <ul className="py-2">
                {/* Links to different sections */}
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

      {/* Display playlists in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure>
              {/* Display playlist image */}
              <img
                src={
                  playlist.places && playlist.places.length > 0
                    ? playlist.places[0].imageUrl  // Use the first place image if available
                    : "https://via.placeholder.com/400x200?text=No+Image"  // Placeholder if no image
                }
                alt={`${playlist.name} cover`}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.className = "w-32 h-32 object-cover mx-auto";  
                  e.target.onerror = null;  
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/11696/11696711.png";  // Default icon
                }}
              />
            </figure>

            <div className="card-body">
              {/* Playlist name */}
              <h2 className="card-title text-xl">{playlist.name}</h2>

              {/* Display the number of places in the playlist */}
              <p className="text-sm text-gray-500">
                {playlist.places?.length ?? 0} place{(playlist.places?.length ?? 0) !== 1 && "s"}
              </p>

              <div className="flex justify-between items-center mt-4">
                {/* Link to view playlist details */}
                <Link to={`/playlists/${playlist.id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
                
                {/* Button to delete playlist */}
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeletePlaylist(playlist.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
