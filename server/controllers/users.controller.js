
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      await models.user.create(body)
        .then((user) => {
          data = user.shift();
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
  getAll: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params } = req;
      const { id: idRoom } = params
      await models.user.getAll(idRoom)
        .then((rooms) => {
          data = rooms;
          result = true;
        });
    } catch (err) {
      console.log(err)
      return next(err);
    }
    return res.response(result, data);
  },
};
