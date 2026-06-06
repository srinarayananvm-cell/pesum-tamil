require('dotenv').config();

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const DialectWord = require('./models/DialectWord');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

const dialectsFolder =
  path.join(__dirname, 'data', 'dialects');

async function importData() {

  try {

    await DialectWord.deleteMany({});

    const files =
      fs.readdirSync(dialectsFolder);

    for (const file of files) {

      if (!file.endsWith('.csv')) continue;

      const filePath =
        path.join(dialectsFolder, file);

      const words = [];

      await new Promise((resolve, reject) => {

        fs.createReadStream(filePath)
          .pipe(csv())

          .on('data', (row) => {

            words.push({

              english: row.english,

              dialect: row.dialect,

              region: row.region

            });

          })

          .on('end', resolve)

          .on('error', reject);

      });

      await DialectWord.insertMany(words);

      console.log(
        `Imported ${words.length} words from ${file}`
      );

    }

    console.log('🎉 Import Completed');

    mongoose.connection.close();

  } catch (error) {

    console.error(error);

  }

}

importData();