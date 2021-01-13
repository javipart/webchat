const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0
    && file !== 'index.js'))
  .forEach((file) => {
    router.use('/', require(path.join(__dirname, file)));
  });

module.exports = router;
