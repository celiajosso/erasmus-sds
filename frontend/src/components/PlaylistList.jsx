import { usePlaylistList } from "./scripts/PlaylistListLogic";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import EmptyState from "./pages/FavoritePlaylistList/EmptyState";
import PlaylistCard from "./pages/FavoritePlaylistList/PlaylistCard";

const plusIcon = <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />;

const PlaylistList = () => {
  const userId = localStorage.getItem("userId") || "user123";
  const { playlists, isMenuOpen, setIsMenuOpen, handleDeletePlaylist } =
    usePlaylistList(userId);

  return (
    <div className="p-6 bg-background">
      <Header
        title="🧭 My Playlists"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <GoBack />

      {playlists.length === 0 ? (
        <EmptyState
          icon={plusIcon}
          title="No playlists yet"
          subtitle="Start creating your favorite playlists!"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onDelete={handleDeletePlaylist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistList;
