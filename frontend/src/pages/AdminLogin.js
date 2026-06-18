import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    const response = await fetch(
      '/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    if (response.ok) {

      localStorage.setItem(
        'adminLoggedIn',
        'true'
      );

      window.location.href = '/admin';

    } else {

      alert('Invalid credentials');

    }

  };

  return (

    <div className="container py-5">

      <div
        className="card shadow mx-auto"
        style={{ maxWidth: '500px' }}
      >

        <div className="card-body">

          <h2 className="text-center mb-4">
            Admin Login
          </h2>

          <form onSubmit={handleLogin}>

            <div className="mb-3">

              <label>
                Username
              </label>

              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />

            </div>

            <div className="mb-3">

              <label>
                Password
              </label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;

