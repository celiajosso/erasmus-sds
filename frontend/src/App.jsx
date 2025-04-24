import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceList from './components/PlaceList';
import PlaceDetails from './components/PlaceDetails';
import FavoriteList from './components/FavoriteList'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceList />} />
        <Route path="/places/:id/details" element={<PlaceDetails />} />
        <Route path="/favorites" element={<FavoriteList />} />

      </Routes>
    </Router>
  );
};

export default App;
