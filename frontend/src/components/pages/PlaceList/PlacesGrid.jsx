import { Link } from "react-router-dom";

import {
  HeartIcon as HeartIconSolid,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const PlacesGrid = ({
  loading,
  places,
  toggleFavorite,
  isFavorite,
  handleAddToPlaylist,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {places.map((place) => (
        <div
          key={place.id}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
        >
          <figure>
            <img
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{place.name}</h2>
            <div className="badge badge-secondary p-2">{place.category}</div>
            <div className="flex justify-between mt-4 gap-1">
              <Link
                to={`/places/${place.id}/details`}
                className="btn btn-primary"
              >
                See Details
              </Link>
              <button
                onClick={() => toggleFavorite(place.id)}
                className="text-gray-800 dark:text-white hover:text-slate-600 dark:hover:text-slate-200 transition duration-200"
                title={
                  isFavorite(place.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {isFavorite(place.id) ? (
                  <HeartIconSolid className="size-8" />
                ) : (
                  <HeartIconOutline className="size-8" />
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
  );
};

export default PlacesGrid;
