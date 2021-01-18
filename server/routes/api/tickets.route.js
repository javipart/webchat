const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/tickets.controller');

routerBase.route('/')
  .post(controller.create);

routerBase.route('/:id')
  .put(controller.update)
  .get(controller.getAll);

routerBase.route('/byid/:id')
  .get(controller.get);

router.use('/tickets', routerBase);


module.exports = router;
