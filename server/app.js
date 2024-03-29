const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const models = require('./models');
const socketApi = require('./utils/socket');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  req.mongo = models;
  req.models = models.mongoose.models;
  req.default = 'Error Processing';
  res.response = (success, data) => res.json({ success, data });
  req.websocket = socketApi;
  next();
});

app.use('/', require('./routes/index'));

app.use('/api/v1', require('./routes/api'));
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({ success: false, data: err });
});

app.listen(port, () => {
  console.info(`Server on port ${port}`);
});

module.exports = app;
