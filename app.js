const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');

require('./config/passport')(passport);
const auth = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('It works');
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});