import { usePlaceListLogic } from "./scripts/PlaceListLogic";

import Header from "./general/Header";
import GoBack from "./general/GoBack";

import AddToPlaylistDialog from "./pages/PlaceList/AddToPlaylistDialog";
import PlacesGrid from "./pages/PlaceList/PlacesGrid";
import SearchControls from "./pages/PlaceList/SearchControls";
import SelectedFilters from "./pages/PlaceList/SelectedFilters";

const PlaceList = () => {
  const {
    places,
    loading,
    categories,
    selectedCategories,
    searchName,
    showModal,
    playlists,
    isMenuOpen,
    newPlaylistName,
    setSearchName,
    addCategory,
    removeCategory,
    handleSearch,
    clearFilters,
    toggleFavorite,
    isFavorite,
    handleAddToPlaylist,
    addPlaceToPlaylist,
    createPlaylistAndAddPlace,
    setShowModal,
    setNewPlaylistName,
    setIsMenuOpen,
  } = usePlaceListLogic();

  return (
    <div className="p-6">
      <Header
        title="🌍 Explore Places"
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <SearchControls
        searchName={searchName}
        setSearchName={setSearchName}
        categories={categories}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
        handleSearch={handleSearch}
        clearFilters={clearFilters}
      />

      <SelectedFilters
        selectedCategories={selectedCategories}
        removeCategory={removeCategory}
      />

      <PlacesGrid
        loading={loading}
        places={places}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        handleAddToPlaylist={handleAddToPlaylist}
      />

      <AddToPlaylistDialog
        showModal={showModal}
        playlists={playlists}
        addPlaceToPlaylist={addPlaceToPlaylist}
        newPlaylistName={newPlaylistName}
        setNewPlaylistName={setNewPlaylistName}
        createPlaylistAndAddPlace={createPlaylistAndAddPlace}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default PlaceList;
