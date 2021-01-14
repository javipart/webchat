const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const socket = require('./utils/socket');

const app = express();
const port = 3011;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  req.getHost = () => `${req.protocol}://${req.get('host')}`;
  res.response = (success, data) => res.json({ success, data });
  req.socket = socket.event;
  next();
});

app.io = socket.io;


app.use('/', require('./routes/index'));
app.use('/event', require('./routes/socket'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const data = {
    message: err.message,
    error: err,
  };
  res.status(statusCode);
  console.log(`${req.method} ${req.getHost()}${req.path} ${statusCode} - ${err.message}`);
  res.response(false, data);
});

app.listen(port, () => {
    console.info(`Server on port ${port}`);
  });

module.exports = app;
