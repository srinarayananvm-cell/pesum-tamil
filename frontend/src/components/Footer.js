import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">

      <div className="container">

        <div className="row">

          <div className="col-md-6">

            <h5>Pesum Tamil</h5>

            <p>
              Preserving and exploring Tamil dialects
              from different regions.
            </p>

          </div>

          <div className="col-md-3">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <Link
                  to="/"
                  className="text-light text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dialects"
                  className="text-light text-decoration-none"
                >
                  Dialects Hub
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="text-light text-decoration-none"
                >
                  Tamil History
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-light text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-light text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>


            </ul>

          </div>

          <div className="col-md-3">

            <h5>Contact</h5>

            <p>Email: contact@pesumtamil.com</p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          © {new Date().getFullYear()} Pesum Tamil.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;