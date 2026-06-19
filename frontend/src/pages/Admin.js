import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Admin() {

  const [feedbacks, setFeedbacks] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({});
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);
  const [editingWord, setEditingWord] = useState(null);

  const loadData = () => {

    fetch('/admin/feedbacks')
      .then(res => res.json())
      .then(data => setFeedbacks(data));

    fetch('/admin/contributions')
      .then(res => res.json())
      .then(data => setContributions(data));

    fetch('/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));

  };

  useEffect(() => {

    loadData();

  }, []);

  const approveContribution = async (id) => {

    try {

      const response = await fetch(
        `/admin/contributions/${id}/approve`,
        {
          method: 'PUT'
        }
      );

      if (response.ok) {

        loadData();

      }

    } catch (error) {

      console.error(error);

    }

  };

  const searchWords = async () => {

    const response =
      await fetch(
        `/admin/words/search?q=${searchTerm}`
      );

    const data =
      await response.json();

    setWords(data);

  };

  const deleteContribution = async (id) => {

    const confirmDelete = window.confirm(
      'Delete this contribution?'
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `/admin/contributions/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {

        loadData();

      }

    } catch (error) {

      console.error(error);

    }

  };

  const deleteWord = async (id) => {

  const confirmDelete = window.confirm(
    'Delete this word?'
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `/admin/words/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (response.ok) {

      searchWords();
      loadData();

    }

  } catch (error) {

    console.error(error);

  }

};

const saveWord = async () => {

  try {

    const response = await fetch(

      `/admin/words/${editingWord._id}`,

      {

        method: 'PUT',

        headers: {

          'Content-Type': 'application/json'

        },

        body: JSON.stringify(editingWord)

      }

    );

    if (response.ok) {

      setEditingWord(null);

      searchWords();

      loadData();

      alert('Word updated successfully');

    }

  } catch (error) {

    console.error(error);

  }

};

  const uploadCSV = async () => {

  if (!file) return;

  const formData = new FormData();

  formData.append(
    'file',
    file
  );

  const response =
    await fetch(
      '/admin/upload-csv',
      {
        method: 'POST',
        body: formData
      }
    );

  const data =
    await response.json();

  alert(
    `${data.count} words imported`
  );

  loadData();

};

  if (
  localStorage.getItem('adminLoggedIn')
  !== 'true'
) {

  return <Navigate to="/admin-login" />;

}

  return (

    <div className="container py-5">

      <h1 className="text-primary mb-4">
        Admin Dashboard
      </h1>
      <div className="card shadow mb-4">

      <div className="card-body">

        <h3 className="mb-3">
          Bulk CSV Upload
        </h3>

        <input
          type="file"
          accept=".csv"
          className="form-control mb-3"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          className="btn btn-primary"
          onClick={uploadCSV}
        >
          Upload CSV
        </button>

      </div>

    </div>


        <div className="card shadow mb-5">

          <div className="card-body">

            <h3 className="mb-4">
              Dictionary Management
            </h3>

            <div className="input-group mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <button
                className="btn btn-primary"
                onClick={searchWords}
              >
                Search
              </button>

            </div>

          </div>

        </div>

        {words.length > 0 && (

          <div className="card shadow mb-5">

            <div className="card-body">

              <h3 className="mb-4">
                Search Results
              </h3>

              <div className="table-responsive">

                <table className="table table-bordered">

                  <thead className="table-info">

                    <tr>

                      <th>English</th>
                      <th>Dialect</th>
                      <th>Tamil</th>
                      <th>Region</th>
                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {words.map(word => (

                      <tr key={word._id}>

                        <td>{word.english}</td>

                        <td>{word.dialect}</td>

                        <td>{word.tamil}</td>

                        <td>{word.region}</td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => setEditingWord(word)}
                          >
                            Edit
                          </button>

                          <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteWord(word._id)}
                        >
                          Delete
                        </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )}





        <div className="row mb-5">

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h5>Total Words</h5>

                <h2 className="text-primary">
                  {stats.totalWords || 0}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h5>Feedbacks</h5>

                <h2 className="text-success">
                  {stats.totalFeedbacks || 0}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h5>Pending</h5>

                <h2 className="text-warning">
                  {stats.pendingContributions || 0}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h5>Approved</h5>

                <h2 className="text-info">
                  {stats.approvedContributions || 0}
                </h2>

              </div>

            </div>

          </div>

        </div>


      {/* Feedback Section */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="mb-4">
            User Feedback
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered">

              <thead className="table-primary">

                <tr>

                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>

                </tr>

              </thead>

              <tbody>

                {feedbacks.map(item => (

                  <tr key={item._id}>

                    <td>{item.name}</td>

                    <td>{item.email}</td>

                    <td>{item.message}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Contributions Section */}

      <div className="card shadow">

        <div className="card-body">

          <h3 className="mb-4">
            Dialect Contributions
          </h3>

          <div className="table-responsive">

            <table className="table table-bordered">

              <thead className="table-success">

                <tr>

                  <th>English Meaning</th>
                  <th>Dialect Word</th>
                  <th>Tamil Script</th>
                  <th>Region</th>
                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {contributions.map(item => (

                  <tr key={item._id}>

                    <td>{item.english}</td>

                    <td>{item.dialect}</td>

                    <td>{item.tamil}</td>

                    <td>{item.region}</td>

                    <td>

                      <span
                        className={
                          item.status === 'approved'
                            ? 'badge bg-success'
                            : 'badge bg-warning text-dark'
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      {item.status === 'pending' && (

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            approveContribution(item._id)
                          }
                        >
                          Approve
                        </button>

                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteContribution(item._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {editingWord && (

    <div
      className="modal d-block"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">

              Edit Word

            </h5>

            <button
              className="btn-close"
              onClick={() =>
                setEditingWord(null)
              }
            />

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              value={editingWord.english}
              onChange={(e) =>
                setEditingWord({
                  ...editingWord,
                  english: e.target.value
                })
              }
              placeholder="English"
            />

            <input
              className="form-control mb-3"
              value={editingWord.dialect}
              onChange={(e) =>
                setEditingWord({
                  ...editingWord,
                  dialect: e.target.value
                })
              }
              placeholder="Dialect"
            />

            <input
              className="form-control mb-3"
              value={editingWord.tamil}
              onChange={(e) =>
                setEditingWord({
                  ...editingWord,
                  tamil: e.target.value
                })
              }
              placeholder="Tamil"
            />

            <input
              className="form-control"
              value={editingWord.region}
              onChange={(e) =>
                setEditingWord({
                  ...editingWord,
                  region: e.target.value
                })
              }
              placeholder="Region"
            />

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={() =>
                setEditingWord(null)
              }
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={saveWord}
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>

    )}

    </div>

  );

}

export default Admin;

