const db = require('../models');
const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/ensureAuth.js');

router.get('/', ensureAuthenticated, function(req, res) {
  console.log(req.user);
  res.render('loggedin');
});

module.exports = router;