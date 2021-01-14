const express = require('express');

const router = express.Router();

router.route('/')
  .post(async (req, res, next) => {
    let error;
    let result = false;
    let response = 'Error on emit event';
    try {
      const { socket, body } = req;
      const { event, data } = body;
      if (event === undefined) {
        error = new Error("'event' must be part of body");
        error.status = 404;
        throw error;
      } else if (data === undefined) {
        error = new Error("'data' must be part of body");
        error.status = 404;
        throw error;
      }
      await socket(event, data)
        .then((dispatched) => {
          response = 'Succesfully';
          result = dispatched;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, response);
  });

module.exports = router;
