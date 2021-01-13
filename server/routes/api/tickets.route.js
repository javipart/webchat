const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/tickets.controller');

routerBase.route('/')
  .get(controller.index)
  .post(controller.save);

router.use('/tickets', routerBase);


module.exports = router;
