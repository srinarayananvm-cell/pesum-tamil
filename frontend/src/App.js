import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DialectsHub from './pages/DialectsHub';
import History from './pages/History';
import DialectDetail from './pages/DialectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
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
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;