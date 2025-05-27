import { Link } from "react-router-dom";

const PlaylistDetailsCard = ({ place, playlistName, onRemove }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
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
            className="btn btn-error"
            onClick={() => onRemove(place.id)}
          >
            Delete from {playlistName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailsCard;
