require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();



app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});