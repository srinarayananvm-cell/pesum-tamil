import React, { useState } from 'react';

function SearchBox({ dialect = null }) {

  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word,
          ...(dialect && { dialect })
        })
      });

      const data = await response.json();

      setResults(data.results || []);
      setSearched(true);

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

          <div className="d-flex gap-2">

          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Search
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => {
              setWord('');
              setResults([]);
              setSearched(false);
            }}
          >
            Clear
          </button>

        </div>

        </div>

      </form>

      {results.length > 0 && (

        <div className="card shadow mt-5">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered">

                <thead className="table-primary">

                  <tr>

                    <th>English Meaning</th>

                    <th>Dialect Word</th>


                    <th>Region</th>

                  </tr>

                </thead>

                <tbody>

                  {results.map((r, idx) => (

                    <tr key={idx}>

                      <td>{r.english}</td>

                      <td>

                        {r.dialect}

                        {r.tamil && (

                          <span className="text-primary fw-bold">
                            {' | '}
                            {r.tamil}
                          </span>

                        )}

                      </td>

                      <td>{r.region}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

      {searched &&
        results.length === 0 && (

        <div className="alert alert-danger mt-4">
          No results found.
        </div>

      )}

    </div>

  );
}

export default SearchBox;