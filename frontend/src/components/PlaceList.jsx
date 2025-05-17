import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
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

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">🌍 Explore Places</h1>

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
            <Link to={`/places/${place.id}/details`} key={place.id}>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
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
      )}
    </div>
  );
};

export default PlaceList;
