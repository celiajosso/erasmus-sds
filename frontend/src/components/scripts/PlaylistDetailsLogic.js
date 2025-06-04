import { useState, useEffect } from "react";
import axios from "axios";

export function usePlaylistDetails(playlistId) {
  const [playlist, setPlaylist] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [route, setRoute] = useState([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!playlistId) return;
    axios
      .get(`${apiUrl}/api/playlists/${playlistId}`)
      .then((res) => setPlaylist(res.data))
      .catch((err) => console.error("Failed to fetch playlist details:", err));
  }, [playlistId, apiUrl]);

  const handleRemovePlace = (placeId) => {
    axios
      .delete(`${apiUrl}/api/playlists/${playlistId}/places/${placeId}`)
      .then(() => {
        setPlaylist((prevPlaylist) => ({
          ...prevPlaylist,
          places: prevPlaylist.places.filter((place) => place.id !== placeId),
        }));
      })
      .catch((err) => {
        console.error("Failed to remove place from playlist:", err);
        alert("Failed to remove place from playlist. Please try again.");
      });
  };

  const fetchRoute = async () => {
  setLoadingRoute(true);
  try {
    const res = await axios.get(`${apiUrl}/api/planner/${playlistId}/route`);
    const routeItems = res.data.items;

    // Attach lat/lng from existing playlist.places (fallback)
    const enrichedItems = routeItems.map((item) => {
      const matchingPlace = playlist?.places?.find(p => p.id === item.place.id);
      return {
        ...item,
        place: {
          ...item.place,
          lat: matchingPlace?.lat,
          lng: matchingPlace?.lng
        }
      };
    });

    console.log(enrichedItems);
    setRoute(enrichedItems);
  } catch (err) {
    console.error("Error fetching route", err);
  }
  setLoadingRoute(false);
};


  return {
    playlist,
    isMenuOpen,
    setIsMenuOpen,
    handleRemovePlace,
    route,
    fetchRoute,
    loadingRoute,
  };
}
