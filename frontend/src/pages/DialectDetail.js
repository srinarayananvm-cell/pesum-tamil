import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../components/Navbar';

function DialectDetail() {

  const { name } = useParams();

  const dialectData = {

    madurai: [
      {
        standard: 'Grandmother',
        dialect: 'Aatha'
      },
      {
        standard: 'Friend',
        dialect: 'Mapla'
      }
    ],

    chennai: [
      {
        standard: 'Friend',
        dialect: 'Machi'
      },
      {
        standard: 'Okay',
        dialect: 'Semma'
      }
    ],

    kongu: [
      {
        standard: 'Come here',
        dialect: 'Va pa'
      },
      {
        standard: 'Food',
        dialect: 'Saapadu'
      }
    ],

    nellai: [
      {
        standard: 'What',
        dialect: 'Enna le'
      },
      {
        standard: 'Go slowly',
        dialect: 'Mella po'
      }
    ],
    nanjil: [
  {
    standard: 'Mother',
    dialect: 'Amme'
  },
  {
    standard: 'Water',
    dialect: 'Vellam'
  }
],

jaffna: [
  {
    standard: 'Boy',
    dialect: 'Podiyan'
  },
  {
    standard: 'Girl',
    dialect: 'Pettai'
  }
]
    
  };

  const words = dialectData[name] || [];

  return (
    <div>

      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="display-4 fw-bold text-primary">
            {name.charAt(0).toUpperCase() + name.slice(1)} Tamil
          </h1>

          <p className="lead">
            Learn about the {name} dialect of Tamil.
          </p>

        </div>

        <div className="card shadow">

          <div className="card-body">

            <h3 className="mb-4">
              Sample Words
            </h3>

            <table className="table table-bordered">

              <thead className="table-primary">

                <tr>
                  <th>Standard Tamil</th>
                  <th>{name} Tamil</th>
                </tr>

              </thead>

              <tbody>

                {words.map((word, index) => (

                  <tr key={index}>

                    <td>{word.standard}</td>

                    <td>{word.dialect}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DialectDetail;