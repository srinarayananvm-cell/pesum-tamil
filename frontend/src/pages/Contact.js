import React, { useState } from 'react';

function Contact() {

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [dialectSubmitted, setDialectSubmitted] = useState(false);

  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-primary">
          Contact Us
        </h1>

        <p className="lead">
          Help us improve Pesum Tamil by sharing feedback
          and contributing dialect words.
        </p>

      </div>

      {/* Contact Information */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="text-primary mb-4">
            Contact Information
          </h3>

          <p>
            Feel free to contact us for suggestions,
            feedback, dialect contributions, or collaboration.
          </p>

          <div className="row">

            <div className="col-md-6">

              <h5>Email</h5>

              <p>
                your-email@example.com
              </p>

            </div>

            <div className="col-md-6">

              <h5>Phone</h5>

              <p>
                +91 XXXXX XXXXX
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Feedback Form */}

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="text-primary mb-4">
            Send Feedback
          </h3>

          {feedbackSubmitted && (
            <div className="alert alert-success">
              Thank you for your feedback!
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFeedbackSubmitted(true);
            }}
          >

            <div className="mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Message
              </label>

              <textarea
                rows="4"
                className="form-control"
                required
              ></textarea>

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Send Feedback
            </button>

          </form>

        </div>

      </div>

      {/* Dialect Contribution Form */}

      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-primary mb-4">
            Contribute a Dialect Word
          </h3>

          <p>
            Help expand Pesum Tamil by contributing
            words from your region.
          </p>

          {dialectSubmitted && (
            <div className="alert alert-success">
              Thank you for your contribution!
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDialectSubmitted(true);
            }}
          >

            <div className="mb-3">

              <label className="form-label">
                Dialect Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Madurai, Chennai, Kongu..."
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                English Meaning
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Grandmother"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Dialect Word
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Aatha"
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Region
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Madurai"
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Submit Contribution
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;

