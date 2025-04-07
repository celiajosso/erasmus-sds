import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceList from './components/PlaceList';
import PlaceDetails from './components/PlaceDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceList />} />
        <Route path="/places/:id/details" element={<PlaceDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
