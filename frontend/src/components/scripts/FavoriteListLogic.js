import { useEffect, useState } from "react";
import axios from "axios";

export default function useFavoriteListLogic() {
  const [favorites, setFavorites] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = "user123";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/favorites`, { params: { userId } })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Failed to fetch favorites:", err));
  }, [apiUrl]);

  const handleDelete = (favoriteId) => {
    console.log("Deleting favorite with ID:", favoriteId);
    axios
      .delete(`${apiUrl}/api/favorites/${favoriteId}`)
      .then(() => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== favoriteId)
        );
      })
      .catch((err) => {
        console.error("Failed to delete favorite:", err);
      });
  };

  return { favorites, handleDelete, isMenuOpen, setIsMenuOpen };
}
