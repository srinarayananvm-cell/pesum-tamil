require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const DialectWord =
  require('./models/DialectWord');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB Error:', err);
  });

app.use(cors());
app.use(express.json());

// --- Global Search API ---
app.post('/search', async (req, res) => {

  try {

    const searchWord =
      req.body.word?.trim() || '';

    const selectedDialect =
      req.body.dialect?.trim();

    let query = {

      $or: [

        {
          english: {
            $regex: searchWord,
            $options: 'i'
          }
        },

        {
          dialect: {
            $regex: searchWord,
            $options: 'i'
          }
        }

      ]

    };

    if (selectedDialect) {

      query.region = {
        $regex: `^${selectedDialect}$`,
        $options: 'i'
      };

    }

    const results =
      await DialectWord.find(query);

    res.json({

      query: searchWord,

      count: results.length,

      results

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: 'Server Error'

    });

  }

});

// --- Serve React frontend build ---
app.use(
  express.static(
    path.join(__dirname, '../frontend/build')
  )
);

// Catch-all route
app.get(/.*/, (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      '../frontend/build',
      'index.html'
    )
  );

});

app.listen(PORT, () => {

  console.log(
    `Server running at http://localhost:${PORT}`
  );

});