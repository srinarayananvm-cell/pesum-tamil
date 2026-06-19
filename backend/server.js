require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const DialectWord =
  require('./models/DialectWord');
const Feedback =
  require('./models/Feedback');
const Contribution =
  require('./models/Contribution');
const upload = multer({
  dest: 'uploads/'
});
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

app.post(
  '/admin/upload-csv',
  upload.single('file'),
  async (req, res) => {

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on('data', (row) => {

        results.push({
          english: row.english,
          dialect: row.dialect,
          tamil: row.tamil,
          region: row.region
        });

      })

      .on('end', async () => {

        try {

          await DialectWord.insertMany(results);

          fs.unlinkSync(req.file.path);

          res.json({
            success: true,
            count: results.length
          });

        } catch (error) {

          console.error(error);

          res.status(500).json({
            error: 'Import failed'
          });

        }

      });

  }
);

// Save Feedback API

app.post('/feedback', async (req, res) => {

  try {

    const feedback =
      new Feedback({

        name: req.body.name,

        email: req.body.email,

        message: req.body.message

      });

    await feedback.save();

    res.status(201).json({

      message: 'Feedback saved successfully'

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: 'Failed to save feedback'

    });

  }

});

// Save Contribution API

app.post('/contribution', async (req, res) => {

  try {

    const contribution =
      new Contribution({

        english: req.body.english,

        dialect: req.body.dialect,

        tamil: req.body.tamil,

        region: req.body.region

      });

    await contribution.save();

    res.status(201).json({

      message: 'Contribution submitted successfully'

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: 'Failed to save contribution'

    });

  }

});

// Get All Feedbacks

app.get('/admin/feedbacks', async (req, res) => {

  const feedbacks =
    await Feedback.find()
      .sort({ createdAt: -1 });

  res.json(feedbacks);

});

// Get All Contributions

app.get('/admin/contributions', async (req, res) => {

  const contributions =
    await Contribution.find()
      .sort({ createdAt: -1 });

  res.json(contributions);

});

// Approve Contribution

app.put('/admin/contributions/:id/approve', async (req, res) => {

  try {

    const contribution =
      await Contribution.findById(req.params.id);

    if (!contribution) {

      return res.status(404).json({
        error: 'Contribution not found'
      });

    }

    await DialectWord.create({

      english: contribution.english,
      dialect: contribution.dialect,
      tamil: contribution.tamil,
      region: contribution.region

    });

    contribution.status = 'approved';

    await contribution.save();

    res.json({
      message: 'Contribution approved'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});

// Delete Contribution

app.delete('/admin/contributions/:id', async (req, res) => {

  try {

    await Contribution.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Contribution deleted'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});

// Admin Login
app.post('/admin/login', (req, res) => {

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {

    return res.json({
      success: true
    });

  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });

});


// Dashboard Statistics

app.get('/admin/stats', async (req, res) => {

  try {

    const totalWords =
      await DialectWord.countDocuments();

    const totalFeedbacks =
      await Feedback.countDocuments();

    const pendingContributions =
      await Contribution.countDocuments({
        status: 'pending'
      });

    const approvedContributions =
      await Contribution.countDocuments({
        status: 'approved'
      });

    res.json({

      totalWords,
      totalFeedbacks,
      pendingContributions,
      approvedContributions

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});

app.get('/admin/words/search', async (req, res) => {

  try {

    const query =
      req.query.q || '';

    const words =
      await DialectWord.find({

        $or: [

          {
            english: {
              $regex: query,
              $options: 'i'
            }
          },

          {
            dialect: {
              $regex: query,
              $options: 'i'
            }
          },

          {
            tamil: {
              $regex: query,
              $options: 'i'
            }
          },

          {
            region: {
              $regex: query,
              $options: 'i'
            }
          }

        ]

      });

    res.json(words);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});


app.delete('/admin/words/:id', async (req, res) => {

  try {

    await DialectWord.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});

app.put('/admin/words/:id', async (req, res) => {

  try {

    const updatedWord =
      await DialectWord.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      );

    res.json(updatedWord);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
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