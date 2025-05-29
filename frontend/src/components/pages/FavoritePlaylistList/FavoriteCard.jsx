import { Link } from "react-router-dom";

const FavoriteCard = ({ fav, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
      <figure>
        <img
          src={fav.place.imageUrl}
          alt={fav.place.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fav.place.name}</h2>
        <div className="badge badge-secondary p-2">{fav.place.category}</div>
        <div className="flex justify-between gap-4 mt-4">
          <Link
            to={`/places/${fav.place.id}/details`}
            className="btn btn-primary"
          >
            See Details
          </Link>
          <button className="btn btn-error" onClick={() => onDelete(fav.id)}>
            Delete from Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
