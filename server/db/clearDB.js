require('dotenv').config();
const mongoose = require('mongoose');

const mongo = process.env.MONGODB;

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to: ${mongo}`))
  .catch((err) => {
    console.log(`There was a problem connecting to mongo at: ${mongo}`);
    console.log(err);
  });

const songSchema = new mongoose.Schema({
  song: mongoose.Schema.Types.Mixed,
  favorited: Boolean,
});

const Song = mongoose.model('Song', songSchema);

Song.deleteMany({})
  .then(() => {
    console.log('Deleted all documents from Song collection');
  })
  .catch((err) => {
    console.log('Error deleting documents:', err);
  })
  .finally(() => {
    // Close the mongoose connection
    mongoose.connection.close();
  });
