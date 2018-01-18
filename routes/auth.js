const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google',
  {scope: ['profile', 'email']})
);

router.get('/google/callback', 
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => res.redirect('/dashboard')); // Successful authentication

router.get('/dashboard', (req, res) => {
  res.send('DASHBOARD!');
});

module.exports = router;