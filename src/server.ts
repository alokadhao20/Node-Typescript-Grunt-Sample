// import express from 'express';
import express = require('express');
const app = express();
const port = 9096;
app.get('/', (req, res) => {
  res.send('The sedulous hyena the t  world !');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});