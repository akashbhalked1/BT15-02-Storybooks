const keys = require('./config/keys');
const express = require('express');
const exphbs = require('express-handlebars');

// MongoDB database -------------------------------------------------
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)
        .then(() => console.log('Connected to mLab MongoDB'))
        .catch((err) => console.log(err));
require('./models/User');

// Sessions and related packages ------------------------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');
var sessionStore = new session.MemoryStore;
const flash = require('express-flash');

// Express ----------------------------------------------------------
const app = express();
const port = process.env.PORT || 5000;

// Passport and Google Oauth20 --------------------------------------
const passport = require('passport');
require('./config/passport')(passport);

// express-handlebars middleware ------------------------------------
app.engine('handlebars', exphbs({defaultLayout: 'master'}));
app.set('view engine', 'handlebars');

// Session and passport middlewares ---------------------------------
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: null },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Global variables -------------------------------------------------
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes (should go below the sessions and passport) ---------------
const index = require('./routes/index');
app.use('/', index);
const auth = require('./routes/auth');
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});