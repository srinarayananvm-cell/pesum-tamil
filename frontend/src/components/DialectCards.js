import React from 'react';
import { useNavigate } from 'react-router-dom';

function DialectCards() {
  const navigate = useNavigate();

  const dialects = [
    {
      name: 'Madurai Tamil',
      region: 'Madurai'
    },
    {
      name: 'Chennai Tamil',
      region: 'Chennai'
    },
    {
      name: 'Kongu Tamil',
      region: 'Coimbatore'
    },
    {
      name: 'Nellai Tamil',
      region: 'Tirunelveli'
    }
  ];

  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Popular Dialects
          </h2>

          <p className="text-muted">
            Explore Tamil spoken across different regions
          </p>

        </div>

        <div className="row g-4">

          {dialects.map((dialect, index) => (

            <div
              className="col-md-6 col-lg-3"
              key={index}
            >

              <div className="card shadow-sm h-100">

                <div className="card-body text-center">

                  <i className="bi bi-geo-alt-fill fs-1 text-primary"></i>

                  <h5 className="mt-3 fw-bold">
                    {dialect.name}
                  </h5>

                  <p className="text-muted">
                    {dialect.region}
                  </p>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      navigate(`/dialect/${dialect.name.split(' ')[0].toLowerCase()}`)
                    }
                  >
                    Explore
                  </button>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default DialectCards;