import { useState, useEffect } from "react";
import axios from "axios";

export function usePlaylistList(userId) {
  const [playlists, setPlaylists] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/playlists`, { params: { userId } })
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.error("Failed to fetch playlists:", err));
  }, [apiUrl, userId]);

  const handleDeletePlaylist = (playlistId) => {
    axios
      .delete(`${apiUrl}/api/playlists/${playlistId}`)
      .then(() => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((p) => p.id !== playlistId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete playlist:", err);
        alert("Failed to delete playlist. Please try again.");
      });
  };

  return {
    playlists,
    isMenuOpen,
    setIsMenuOpen,
    handleDeletePlaylist,
  };
}
