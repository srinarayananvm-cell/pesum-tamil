import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {

const isAdminLoggedIn =
  localStorage.getItem('adminLoggedIn') === 'true';

const handleLogout = () => {

  localStorage.removeItem('adminLoggedIn');

  window.location.href = '/admin-login';

};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          <img
          src={logo}
          alt="Pesum Tamil Logo"
          width="40"
          height="40"
          className="me-2"
        />

        Pesum Tamil
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/history">
                Tamil History
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/dialects">
                Dialects Hub
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact">
                Contact
              </Link>
            </li>

            {isAdminLoggedIn && (

              <li className="nav-item">

                <button
                  className="btn btn-outline-light ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>

            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;