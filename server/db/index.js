// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const mongo = process.env.MONGODB;

const db = mongoose.connect(mongo, { useNewUrlParser: true });

db
  .then(() => console.log(`Connected to: ${mongo}`))
  .catch((err) => {
    console.log(`There was a problem connecting to mongo at: ${mongo}`);
    console.log(err);
  });

module.exports = db;
