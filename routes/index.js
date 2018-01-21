const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Story = mongoose.model('stories');
const {ensureAuth, ensureGuest} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuth, (req, res) => {
  Story.find({user: req.user.id})
       .sort({date: -1})
       .then((stories) => res.render('index/dashboard', {stories}))
       .catch((err) => console.log(err));
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;