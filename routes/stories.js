const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../helpers/auth');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

router.get('/', (req, res) => {
  Story.find({status: 'public'})
       .populate('user')
       .then((stories) => res.render('stories/index', {stories}))
       .catch((err) => console.log(err));
});

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

router.get('/:id/edit', ensureAuth, (req, res) => {
  Story.findById(req.params.id)
       .then((story) => res.render('stories/edit', {story}))
       .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
  let allowComments;
  if(req.body.allowComments) allowComments = true;
  else allowComments = false;
  
  let newStory = {
    title: req.body.title,
    status: req.body.status,
    allowComments,
    body: req.body.ck,
    user: req.user.id,
  };

  new Story(newStory).save()
                     .then((s) => res.redirect(`/stories/${s.id}/show`))
                     .catch((err) => console.log(err));
});

router.get('/:id/show', (req, res) => {
  Story.findById(req.params.id)
       .populate('user')
       .then((story) => res.render('stories/show', {story}))
       .catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
  Story.findById(req.params.id)
       .then((story) => {
         let allowComments;
         if(req.body.allowComments) allowComments = true;
         else allowComments = false;

         story.title = req.body.title;
         story.status = req.body.status;
         story.allowComments = allowComments;
         story.body = req.body.ck;

         story.save()
              .then((s) => res.redirect('/dashboard'))
              .catch((err) => console.log(err));
       });
});

module.exports = router;