import React from 'react';
import logo from '../assets/logo.png';

function About() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <img
          src={logo}
          alt="Pesum Tamil Logo"
          className="img-fluid mb-4"
          style={{ maxWidth: '220px' }}
        />

        <h1 className="fw-bold text-primary">
          About Pesum Tamil
        </h1>

        <p className="lead">
          Preserving Tamil Dialects Across Regions
        </p>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="text-primary">
            About the Project
          </h3>

          <p>
            Pesum Tamil is a platform dedicated to preserving,
            exploring, and documenting the rich diversity of
            Tamil dialects spoken across Tamil Nadu, Sri Lanka,
            and Tamil-speaking communities worldwide.
          </p>

          <p>
            The platform helps users discover regional words,
            compare dialects, and learn how Tamil varies from
            one region to another.
          </p>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="text-primary">
            Our Mission
          </h3>

          <p>
            Many regional Tamil words are slowly disappearing
            from daily usage. Pesum Tamil aims to preserve
            these valuable linguistic traditions and make
            them accessible to future generations.
          </p>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="text-primary">
            Founder
          </h3>

          <h5>
            Srinarayanan V M
          </h5>

          <p>
            M.Sc Graduate with a passion for technology,
            language preservation, and Tamil culture.
          </p>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="text-primary">
            Project Development
          </h3>

          <ul>
            <li>Frontend: React.js</li>
            <li>Backend: Node.js & Express.js</li>
            <li>Database: MongoDB</li>
            <li>UI Framework: Bootstrap 5</li>
          </ul>

          <h5 className="mt-3">
            Future Plans
          </h5>

          <ul>
            <li>More dialect datasets</li>
            <li>Audio pronunciation support</li>
            <li>User dialect contributions</li>
            <li>Tamil script support</li>
            <li>Dialect comparison tools</li>
          </ul>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-primary">
            Acknowledgements
          </h3>

          <p>
            This project was developed with guidance and
            technical assistance from OpenAI ChatGPT for
            planning, feature development, debugging, and
            project enhancement.
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;