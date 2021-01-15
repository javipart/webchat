const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => res.response(true, { status: 'Running' }));

module.exports = router;
