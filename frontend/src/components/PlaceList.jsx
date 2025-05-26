import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './general/Header';
import { HeartIcon as HeartIconSolid, PlusIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [favorites, setFavorites] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const location = useLocation();

  // Fetch all places and categories on initial load
  useEffect(() => {
    setLoading(true);

    // Read the search parameters from the URL
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const categoriesParam = params.getAll('category');

    if (nameParam) setSearchName(nameParam);
    if (categoriesParam.length) setSelectedCategories(categoriesParam);

    // Fetch places (with or without filters)
    const fetchPlaces = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/places`, { params });
        setPlaces(result.data.places);
        const allCategories = [...new Set(result.data.places.map(p => p.category))];
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      }
    };
    
    fetchPlaces();

    axios.get(`${apiUrl}/api/favorites`, { params: { userId: "user123" } })
      .then((res) => {
        setFavorites(res.data); 
      })
      .catch((err) => {
        console.error("Failed to fetch favorites:", err);
      });
  }, [apiUrl, location.search]);

  // Add selected category to the filter list
  const addCategory = (cat) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // Remove selected category from the filter list
  const removeCategory = (cat) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };

  // Handle the search button click and update URL with search filters
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchName) params.append('name', searchName);
    selectedCategories.forEach(cat => params.append('category', cat));

    navigate({ search: params.toString() });  // Use navigate to update the URL with new search filters
  };

  // Clear all filters and reload all places
  const clearFilters = () => {
    setSearchName('');
    setSelectedCategories([]);
    navigate({ search: '' });  // Clear the URL filters
  };




  const toggleFavorite = (placeId) => {
    const favorite = favorites.find(fav => fav.place && fav.place.id === placeId);
    if (favorite) {
      // Delete frome Favorite
      axios.delete(`${apiUrl}/api/favorites/${favorite.id}`)
        .then(() => {
          setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== favorite.id));
        })
        .catch((err) => {
          console.error("Failed to delete favorite:", err);
        });
    } else {
      // Add to Favorite
      const userId = "user123";
      axios.post(`${apiUrl}/api/favorites`, null, { params: { userId, placeId } })
      .then(() => {
        axios.get(`${apiUrl}/api/favorites`, { params: { userId } })
          .then((res) => {
            const validFavorites = res.data.filter(fav => fav.place);
            setFavorites(validFavorites);
          });
      })
      
        .catch((err) => console.error("Failed to add to favorites:", err));
    }
  };
  
  

  const isFavorite = (placeId) => {
    return favorites.some(fav => fav.place && fav.place.id === placeId); // Verifie if the place is in favorites
  };





  const handleAddToPlaylist = (placeId) => {
    setSelectedPlaceId(placeId); 
    setShowModal(true);
  
    axios.get(`${apiUrl}/api/playlists`, { params: { userId: "user123" } })
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.error("Failed to load playlists:", err));
  };



  const addPlaceToPlaylist = async (playlistId) => {
    if (!selectedPlaceId) {
      console.error("Place ID is not selected");
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/api/playlists/${playlistId}`);
      if (!response.ok) {
        console.error("Failed to fetch playlist details");
        return;
      }
  
      const playlist = await response.json();
      const isPlaceAlreadyInPlaylist = playlist.places.some(
        (place) => place.id === selectedPlaceId
      );
  
      if (isPlaceAlreadyInPlaylist) {
        alert("This place is already in the playlist!");
        return;
      }
  
      const addResponse = await fetch(
        `${apiUrl}/api/playlists/${playlistId}/places/${selectedPlaceId}`,
        {
          method: "POST",
        }
      );
  
      if (!addResponse.ok) {
        console.error("Failed to add place to playlist");
        return;
      }
  
      setShowModal(false);
    } catch (err) {
      console.error("Error adding to playlist:", err);
    }
  };
  
  
  

  

  const createPlaylistAndAddPlace = async () => {
    const userId = "user123"; 
    if (!newPlaylistName.trim() || !selectedPlaceId) return;
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/playlists?userId=${userId}&name=${encodeURIComponent(newPlaylistName)}`,
        {
          method: "POST",
        }
      );
  
      if (!response.ok) {
        console.error("Error when creating playlist");
        return;
      }
  
      const createdPlaylist = await response.json();
  
      const addResponse = await fetch(
        `http://localhost:8080/api/playlists/${createdPlaylist.id}/places/${selectedPlaceId}`,
        {
          method: "POST",
        }
      );
  
      if (!addResponse.ok) {
        console.error("Error when adding to playlist");
        return;
      }
  
      setPlaylists([...playlists, createdPlaylist]);
      setNewPlaylistName("");
      setShowModal(false);
    } catch (err) {
      console.error("Network error :", err);
    }
  };





  return (
    <div className="p-6">
      <Header
        title="🌍 Explore Places"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full sm:w-64"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <select
          className="select select-bordered w-full sm:w-64"
          onChange={(e) => {
            const selected = e.target.value;
            if (selected) addCategory(selected);
            e.target.value = '';
          }}
        >
          <option value="">Add Category Filter</option>
          {categories
            .filter((cat) => !selectedCategories.includes(cat))
            .map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>

        <button className="btn btn-outline" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Selected Filters */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {selectedCategories.map((cat) => (
            <div
              key={cat}
              className="badge badge-outline badge-lg flex items-center gap-2 px-3 py-1"
            >
              {cat}
              <button
                className="ml-1 text-red-500 hover:text-red-700"
                onClick={() => removeCategory(cat)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Places Grid or Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {places.map((place) => (
            // <Link to={`/places/${place.id}/details`} key={place.id}>
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
                <Link to={`/places/${place.id}/details`} key={place.id} className="btn btn-primary">See Details</Link>
                <button
                  onClick={() => toggleFavorite(place.id)}
                  className="text-white hover:text-slate-200 transition duration-200"
                  title={isFavorite(place.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite(place.id) ? (
                    <HeartIconSolid className="size-8"  />
                  ) : (
                    <HeartIconOutline className="size-8"  />
                  )}
                </button>



                <button
                 onClick={() => handleAddToPlaylist(place.id)}               
                  className="btn btn-accent"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
            // </Link>
          ))}
        </div>
      )}


{showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Add to a playlist</h2>  
            <ul className="mb-4 max-h-60 overflow-y-auto">
              {playlists.map((pl) => (
                <li key={pl.id}>
                  <button
                    className="btn w-full mb-2"
                    onClick={() => addPlaceToPlaylist(pl.id)}
                  >
                    {pl.name}
                  </button>
                </li>
              ))}
            </ul>
  
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-2  text-blue-500">Playlist name</h3>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="input input-bordered w-full mb-2"
                placeholder="Playlist name"
              />
              <button className="btn btn-primary w-full" onClick={createPlaylistAndAddPlace}>
                Create and add
              </button>
            </div>
  
            <button
              className="btn btn-error mt-4 w-full"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceList;
