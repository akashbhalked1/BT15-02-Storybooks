const express = require('express');
const router = express.Router();

// Routes -----------------------------------------------------------
router.get('/', (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

module.exports = router;