const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/agents.controller');

routerBase.route('/:doc')
  .get(controller.get);

router.use('/agents', routerBase);


module.exports = router;
