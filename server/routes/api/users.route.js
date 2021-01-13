const express = require('express');

const router = express.Router();
const routerBase = express.Router();


const controller = require('../../controllers/users.controller');

routerBase.route('/')
  .get(controller.index)
  .post(controller.save);

router.use('/users', routerBase);


module.exports = router;
