require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./routes.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/classes', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
