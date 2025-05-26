import Header from './general/Header';
import GoBack from './general/GoBack';
import { HeartIcon as HeartIconSolid, PlusIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { usePlaceListLogic } from './scripts/PlaceListLogic';
import { Link } from 'react-router-dom';

const PlaceList = () => {
  const {
    places, loading, categories, selectedCategories, searchName, showModal,
    selectedPlaceId, playlists, isMenuOpen, newPlaylistName,
    setSearchName, addCategory, removeCategory, handleSearch,
    clearFilters, toggleFavorite, isFavorite, handleAddToPlaylist,
    addPlaceToPlaylist, createPlaylistAndAddPlace, setShowModal,
    setNewPlaylistName, setIsMenuOpen
  } = usePlaceListLogic();
  return (
    <div className="p-6">
      <Header
        title="🌍 Explore Places"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />

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
