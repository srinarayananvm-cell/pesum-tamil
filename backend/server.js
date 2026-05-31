const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// --- Global Search API ---
app.post('/search', async (req, res) => {

  const searchWord =
    req.body.word?.toLowerCase().trim() || '';

  const dialectsPath =
    path.join(__dirname, 'data/dialects');

  let results = [];

  try {

    const files = fs.readdirSync(dialectsPath);

    for (const file of files) {

      if (path.extname(file) === '.csv') {

        const filePath =
          path.join(dialectsPath, file);

        await new Promise((resolve, reject) => {

          fs.createReadStream(filePath)
            .pipe(csv())

            .on('data', (row) => {

              const standard =
                row.standard?.toLowerCase() || '';

              const dialect =
                row.dialect?.toLowerCase() || '';

              if (
                standard.includes(searchWord) ||
                dialect.includes(searchWord)
              ) {

                results.push(row);

              }

            })

            .on('end', resolve)

            .on('error', reject);

        });

      }

    }

    res.json({
      query: searchWord,
      count: results.length,
      results
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });

  }

});

// --- Serve React frontend build ---
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route
app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../frontend/build', 'index.html')
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});