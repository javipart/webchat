const fs = require('fs');
const path = require('path');
const driver = require('../drivers/mongo');

const noModel = ['.', 'index.js', 'schemas'];
driver.connect();
fs
  .readdirSync(__dirname)
  .filter((file) => (noModel.indexOf(file) === -1))
  .forEach((file) => {
    require(path.join(__dirname, file));
  });

module.exports = driver;
