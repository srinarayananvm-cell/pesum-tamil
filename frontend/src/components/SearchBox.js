import React, { useState } from 'react';

function SearchBox() {

  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word })
      });

      const data = await response.json();

      setResults(data.results || []);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="mt-5">

      <form
        onSubmit={handleSearch}
        className="row g-2 justify-content-center"
      >

        <div className="col-md-8">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search Tamil dialect word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />

        </div>

        <div className="col-md-2">

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
          >
            Search
          </button>

        </div>

      </form>

      {results.length > 0 && (

        <div className="card shadow mt-5">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered">

                <thead className="table-primary">

                  <tr>

                    <th>Standard Word</th>

                    <th>Dialect Word</th>

                    <th>Meaning</th>

                    <th>Region</th>

                  </tr>

                </thead>

                <tbody>

                  {results.map((r, idx) => (

                    <tr key={idx}>

                      <td>{r.standard}</td>

                      <td>{r.dialect}</td>

                      <td>{r.meaning}</td>

                      <td>{r.region}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

      {results.length === 0 &&
        word.trim() !== '' && (

        <div className="alert alert-danger mt-4">
          No results found.
        </div>

      )}

    </div>

  );
}

export default SearchBox;