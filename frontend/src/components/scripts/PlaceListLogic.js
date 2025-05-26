import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const usePlaceListLogic = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [favorites, setFavorites] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const categoriesParam = params.getAll('category');

    if (nameParam) setSearchName(nameParam);
    if (categoriesParam.length) setSelectedCategories(categoriesParam);

    const fetchPlaces = async () => {
      try {
        const result = await axios.get(`${apiUrl}/api/places`, { params });
        setPlaces(result.data.places);
        const allCategories = [...new Set(result.data.places.map(p => p.category))];
        setCategories(allCategories);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      }
    };

    fetchPlaces();

    axios.get(`${apiUrl}/api/favorites`, { params: { userId: "user123" } })
      .then(res => setFavorites(res.data))
      .catch(err => console.error("Failed to fetch favorites:", err));
  }, [apiUrl, location.search]);

  const addCategory = (cat) => {
    if (!selectedCategories.includes(cat)) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const removeCategory = (cat) => {
    setSelectedCategories(selectedCategories.filter(c => c !== cat));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchName) params.append('name', searchName);
    selectedCategories.forEach(cat => params.append('category', cat));
    navigate({ search: params.toString() });
  };

  const clearFilters = () => {
    setSearchName('');
    setSelectedCategories([]);
    navigate({ search: '' });
  };

  const toggleFavorite = (placeId) => {
    const favorite = favorites.find(fav => fav.place?.id === placeId);
    if (favorite) {
      axios.delete(`${apiUrl}/api/favorites/${favorite.id}`)
        .then(() => {
          setFavorites(prev => prev.filter(fav => fav.id !== favorite.id));
        })
        .catch(err => console.error("Failed to delete favorite:", err));
    } else {
      axios.post(`${apiUrl}/api/favorites`, null, { params: { userId: "user123", placeId } })
        .then(() => {
          axios.get(`${apiUrl}/api/favorites`, { params: { userId: "user123" } })
            .then(res => setFavorites(res.data.filter(fav => fav.place)));
        })
        .catch(err => console.error("Failed to add favorite:", err));
    }
  };

  const isFavorite = (placeId) =>
    favorites.some(fav => fav.place?.id === placeId);

  const handleAddToPlaylist = (placeId) => {
    setSelectedPlaceId(placeId);
    setShowModal(true);
    axios.get(`${apiUrl}/api/playlists`, { params: { userId: "user123" } })
      .then(res => setPlaylists(res.data))
      .catch(err => console.error("Failed to load playlists:", err));
  };

  const addPlaceToPlaylist = async (playlistId) => {
    if (!selectedPlaceId) return;

    try {
      const playlist = await (await fetch(`${apiUrl}/api/playlists/${playlistId}`)).json();
      const alreadyExists = playlist.places.some(p => p.id === selectedPlaceId);
      if (alreadyExists) return alert("This place is already in the playlist!");

      const res = await fetch(`${apiUrl}/api/playlists/${playlistId}/places/${selectedPlaceId}`, {
        method: "POST",
      });
      if (res.ok) setShowModal(false);
    } catch (err) {
      console.error("Error adding to playlist:", err);
    }
  };

  const createPlaylistAndAddPlace = async () => {
    const userId = "user123";
    if (!newPlaylistName.trim() || !selectedPlaceId) return;

    try {
      const response = await fetch(`${apiUrl}/api/playlists?userId=${userId}&name=${encodeURIComponent(newPlaylistName)}`, {
        method: "POST",
      });

      if (!response.ok) return console.error("Error when creating playlist");

      const playlist = await response.json();
      const res = await fetch(`${apiUrl}/api/playlists/${playlist.id}/places/${selectedPlaceId}`, {
        method: "POST",
      });

      if (res.ok) {
        setPlaylists([...playlists, playlist]);
        setNewPlaylistName("");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return {
    places, loading, categories, selectedCategories, searchName, showModal,
    selectedPlaceId, playlists, isMenuOpen, newPlaylistName, favorites,
    setSearchName, addCategory, removeCategory, handleSearch, clearFilters,
    toggleFavorite, isFavorite, handleAddToPlaylist, addPlaceToPlaylist,
    createPlaylistAndAddPlace, setShowModal, setNewPlaylistName, setIsMenuOpen
  };
};
