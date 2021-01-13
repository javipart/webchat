const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/rooms.controller');

routerBase.route('/')
  .get(controller.index)
  .post(controller.save);

router.use('/rooms', routerBase);


module.exports = router;
