const keys = require('./config/keys');
const express = require('express');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI)
        .then(() => console.log('Connected to mLab MongoDB'))
        .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');

require('./config/passport')(passport);
const auth = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('It works');
});

app.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});