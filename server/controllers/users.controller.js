
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
};
