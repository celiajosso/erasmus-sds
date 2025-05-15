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
        <h1 className="text-4xl font-bold text-center text-primary flex-1">Your Playlists</h1>

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

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4 animate-spin-slow text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-2xl font-semibold mb-2">No playlists found</p>
          <p className="text-gray-400 mb-6">Start creating your favorite playlists!</p>
              <Link to={`/`}             className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition">Explore place</Link>
          

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure>
                <img
                  src={
                    playlist.places && playlist.places.length > 0
                      ? playlist.places[0].imageUrl
                      : "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={`${playlist.name} cover`}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.className = "w-32 h-32 object-cover mx-auto";
                    e.target.onerror = null;
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/11696/11696711.png";
                  }}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-xl">{playlist.name}</h2>
                <p className="text-sm text-gray-500">
                  {playlist.places?.length ?? 0} place{(playlist.places?.length ?? 0) !== 1 && "s"}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/playlists/${playlist.id}`} className="btn btn-primary btn-sm">
                    View
                  </Link>
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
      )}
    </div>
  );
};

export default PlaylistList;
