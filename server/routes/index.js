const express = require('express');


const router = express.Router();

router.route('/')
  .get((req, res) => {
    const response = {
      status: 'Running',
    };
    return res.json({success: true, data: response});
  });

module.exports = router;
