import React from 'react';
import { useParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

function DialectDetail() {

  const { name } = useParams();

  const dialectData = {

    madurai: [
      {
        english: 'Grandmother',
        dialect: 'Aatha'
      },
      {
        english: 'Friend',
        dialect: 'Mapla'
      }
    ],

    chennai: [
      {
        english: 'Friend',
        dialect: 'Machi'
      },
      {
        english: 'Super',
        dialect: 'Semma'
      }
    ],

    kongu: [
      {
        english: 'Come here',
        dialect: 'Va pa'
      },
      {
        english: 'Food',
        dialect: 'Saapadu'
      }
    ],

    nellai: [
      {
        english: 'What',
        dialect: 'Enna le'
      },
      {
        english: 'Go slowly',
        dialect: 'Mella po'
      }
    ],
    nanjil: [
  {
    english: 'Mother',
    dialect: 'Amme'
  },
  {
    english: 'Water',
    dialect: 'Vellam'
  }
],

jaffna: [
  {
    english: 'Boy',
    dialect: 'Podiyan'
  },
  {
    english: 'Girl',
    dialect: 'Pettai'
  }
]
    
  };

  const words = dialectData[name] || [];

  return (

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="display-4 fw-bold text-primary">
            {name.charAt(0).toUpperCase() + name.slice(1)} Tamil
          </h1>

          <p className="lead">
            Learn about the {name} dialect of Tamil.
          </p>

        </div>
        
        <SearchBox dialect={name}/>

        <div className="card shadow mt-5">

          <div className="card-body">

            <h3 className="mb-4">
              Sample Words
            </h3>

            <table className="table table-bordered">

              <thead className="table-primary">

                <tr>
                  <th>English Meaning</th>
                  <th>{name} Tamil</th>
                </tr>

              </thead>

              <tbody>

                {words.map((word, index) => (

                  <tr key={index}>

                    <td>{word.english}</td>

                    <td>{word.dialect}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

  );
}

export default DialectDetail;