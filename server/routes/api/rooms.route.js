const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/rooms.controller');

routerBase.route('/')
  .post(controller.create);

routerBase.route('/message')
  .post(controller.pushMessage);

routerBase.route('/:doc')
  .get(controller.getAgent);

routerBase.route('/room/:id')
  .get(controller.get);

router.use('/rooms', routerBase);


module.exports = router;
