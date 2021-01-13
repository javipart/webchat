const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/rooms.controller');

routerBase.route('/')
  .post(controller.create);

router.use('/rooms', routerBase);


module.exports = router;
