import { useState, useEffect } from 'react'
import axios from 'axios'

export function usePlaylistDetails(playlistId) {
  const [playlist, setPlaylist] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    if (!playlistId) return
    axios.get(`${apiUrl}/api/playlists/${playlistId}`)
      .then((res) => setPlaylist(res.data))
      .catch((err) => console.error("Failed to fetch playlist details:", err))
  }, [playlistId, apiUrl])

  const handleRemovePlace = (placeId) => {
    axios
      .delete(`${apiUrl}/api/playlists/${playlistId}/places/${placeId}`)
      .then(() => {
        setPlaylist((prevPlaylist) => ({
          ...prevPlaylist,
          places: prevPlaylist.places.filter((place) => place.id !== placeId),
        }))
      })
      .catch((err) => {
        console.error("Failed to remove place from playlist:", err)
        alert("Failed to remove place from playlist. Please try again.")
      })
  }

  return {
    playlist,
    isMenuOpen,
    setIsMenuOpen,
    handleRemovePlace,
  }
}
