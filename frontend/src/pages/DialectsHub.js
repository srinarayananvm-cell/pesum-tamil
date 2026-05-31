import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function DialectsHub() {
  const navigate = useNavigate();

  const dialects = [
    {
      name: 'Madurai Tamil',
      description: 'Famous for its traditional and rural expressions.'
    },
    {
      name: 'Chennai Tamil',
      description: 'Urban slang mixed with modern vocabulary.'
    },
    {
      name: 'Kongu Tamil',
      description: 'Dialect commonly spoken in western Tamil Nadu.'
    },
    {
      name: 'Nellai Tamil',
      description: 'Known for unique pronunciation and vocabulary.'
    },
    {
      name: 'Nanjil Tamil',
      description: 'Spoken in Kanyakumari region with Malayalam influence.'
    },
    {
      name: 'Jaffna Tamil',
      description: 'Sri Lankan Tamil dialect with ancient Tamil features.'
    }
  ];

  return (
    <div>

      <Navbar />

      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-5">

            <h1 className="display-4 fw-bold">
              Dialects Hub
            </h1>

            <p className="lead text-muted">
              Discover how Tamil changes across regions
            </p>

          </div>

          <div className="row g-4">

            {dialects.map((dialect, index) => (

              <div
                className="col-md-6 col-lg-4"
                key={index}
              >

                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    <div className="text-center">

                      <i className="bi bi-chat-dots-fill fs-1 text-primary"></i>

                      <h4 className="mt-3 fw-bold">
                        {dialect.name}
                      </h4>

                    </div>

                    <p className="text-muted mt-3">
                      {dialect.description}
                    </p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        navigate(`/dialect/${dialect.name.split(' ')[0].toLowerCase()}`)
                      }
                    >
                      Explore Dialect
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}

export default DialectsHub;