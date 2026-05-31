import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DialectsHub from './pages/DialectsHub';
import History from './pages/History';
import DialectDetail from './pages/DialectDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dialects"
          element={<DialectsHub />}
        />

        <Route
          path="/history"
          element={<History />}
        />
        <Route
          path="/dialect/:name"
          element={<DialectDetail />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;