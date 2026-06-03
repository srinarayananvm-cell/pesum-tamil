import React from 'react';
import DialectCards from '../components/DialectCards';

import SearchBox from '../components/SearchBox';

function Home() {

  return (
    <div>

      <section
        className="bg-dark text-light text-center d-flex align-items-center"
        style={{
          minHeight: '90vh'
        }}
      >

        <div className="container">

          <h1 className="display-1 fw-bold">
            Pesum Tamil
          </h1>

          <p className="lead mt-4 fs-3">
            Discover the richness of Tamil dialects,
            regional words, and culture.
          </p>

          <div className="mt-5">
            <SearchBox />
          </div>

        </div>

      </section>
      <DialectCards />

    </div>
  );
}

export default Home;