const express = require('express');
const dotenv = require('dotenv');
dotenv.config;

const app = express();
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log('Server is running in port: ', port);
});