import React, { useState } from 'react';

function Contact() {

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [dialectSubmitted, setDialectSubmitted] = useState(false);

  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [contribution, setContribution] = useState({
    english: '',
    dialect: '',
    tamil: '',
    region: ''
  });

  const handleFeedbackSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
      });

      if (response.ok) {

        setFeedbackSubmitted(true);

        setFeedback({
          name: '',
          email: '',
          message: ''
        });

      }

    } catch (error) {

      console.error(error);

    }

  };

  const handleContributionSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('/contribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contribution)
      });

      if (response.ok) {

        setDialectSubmitted(true);

        setContribution({
          english: '',
          dialect: '',
          tamil: '',
          region: ''
        });

      }

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold text-primary">
          Contact Us
        </h1>

        <p className="lead">
          Help us improve Pesum Tamil by sharing feedback,
          suggestions, and dialect contributions.
        </p>

      </div>

      <div className="card shadow mb-5">

        <div className="card-body">

          <h3 className="text-primary mb-4">
            Contact Information
          </h3>

          <div className="row">

            <div className="col-md-6 mb-3">

              <h5>Email</h5>

              <p>
                srinarayananvm@gmail.com
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h5>Phone</h5>

              <p>
                +91 94459 XXXXX
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h5>GitHub</h5>

              <p>
                https://github.com/srinaraynanvm-cell
              </p>

            </div>

            <div className="col-md-6 mb-3">

              <h5>LinkedIn</h5>

              <p>
                https://www.linkedin.com/in/srinarayanan02vm
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

          <form onSubmit={handleFeedbackSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                value={feedback.name}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    name: e.target.value
                  })
                }
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
                value={feedback.email}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    email: e.target.value
                  })
                }
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
                value={feedback.message}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    message: e.target.value
                  })
                }
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

      {/* Contribution Form */}

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

          <form onSubmit={handleContributionSubmit}>

            <div className="mb-3">

              <label className="form-label">
                English Meaning
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Grandmother"
                value={contribution.english}
                onChange={(e) =>
                  setContribution({
                    ...contribution,
                    english: e.target.value
                  })
                }
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
                value={contribution.dialect}
                onChange={(e) =>
                  setContribution({
                    ...contribution,
                    dialect: e.target.value
                  })
                }
                required
              />

            </div>

            <div className="mb-3">

            <label className="form-label">
              Tamil Script
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="ஆத்தா"
              value={contribution.tamil}
              onChange={(e) =>
                setContribution({

                  ...contribution,

                  tamil: e.target.value

                })
              }
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
                value={contribution.region}
                onChange={(e) =>
                  setContribution({
                    ...contribution,
                    region: e.target.value
                  })
                }
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

