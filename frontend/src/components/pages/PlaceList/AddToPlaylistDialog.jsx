const AddToPlaylistDialog = ({
  showModal,
  playlists,
  addPlaceToPlaylist,
  newPlaylistName,
  setNewPlaylistName,
  createPlaylistAndAddPlace,
  setShowModal,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-500">
          Add to a playlist
        </h2>

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
          <h3 className="text-lg font-semibold mb-2 text-blue-500">
            Playlist name
          </h3>
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="Playlist name"
          />
          <button
            className="btn btn-primary w-full"
            onClick={createPlaylistAndAddPlace}
          >
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
  );
};

export default AddToPlaylistDialog;
