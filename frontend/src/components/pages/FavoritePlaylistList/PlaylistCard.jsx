import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist, onDelete }) => {
  return (
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
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/11696/11696711.png";
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{playlist.name}</h2>
        <p className="text-sm text-gray-500">
          {playlist.places?.length ?? 0} place
          {(playlist.places?.length ?? 0) !== 1 && "s"}
        </p>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/playlists/${playlist.id}`}
            className="btn btn-primary btn-sm"
          >
            View
          </Link>
          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(playlist.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
