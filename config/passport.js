const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // proxy: true   // to work with Heroku's 'https://'
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({googleID: profile.id})
            .then((user) => {
              if(user) done(null, user);
              else {
                let imgStr = profile.photos[0].value;
                let img = imgStr.substring(0, imgStr.indexOf('?'));
                let newUser = {
                  googleID: profile.id,
                  email: profile.emails[0].value,
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  image: img
                };
                new User(newUser).save()
                                 .then((usr) => done(null, usr));
              }
            })
            .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => User.findById(id)
                                             .then((usr) => done(null, usr)));
};