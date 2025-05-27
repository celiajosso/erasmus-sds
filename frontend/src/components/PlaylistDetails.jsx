import { useParams } from "react-router-dom";

import { usePlaylistDetails } from "./scripts/PlaylistDetailsLogic";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import PlaylistDetailsCard from "./pages/PlaylistDetails/PlaylistDetailsCard";

const PlaylistDetails = () => {
  const { id: playlistId } = useParams();
  const { playlist, isMenuOpen, setIsMenuOpen, handleRemovePlace } =
    usePlaylistDetails(playlistId);

  if (!playlist) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Header
        title={playlist.name}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {playlist.places.map((place) => (
          <PlaylistDetailsCard
            key={place.id}
            place={place}
            playlistName={playlist.name}
            onRemove={handleRemovePlace}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
