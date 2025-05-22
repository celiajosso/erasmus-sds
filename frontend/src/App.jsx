import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceList from './components/PlaceList';
import PlaceDetails from './components/PlaceDetails';
import FavoriteList from './components/FavoriteList'; 
import PlaylistList from './components/PlaylistList';
import PlaylistDetails from './components/PlaylistDetails';
import { PlannerForm } from './components/PlannerForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceList />} />
        <Route path="/places/:id/details" element={<PlaceDetails />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/playlists" element={<PlaylistList />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />
        <Route path="/planner" element={<PlannerForm />} />
      </Routes>
    </Router>
  );
};

export default App;
