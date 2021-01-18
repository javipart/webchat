
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      await models.ticket.create(body)
        .then((ticket) => {
          data = ticket;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },

  get: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params } = req;
      const { id } = params;
      await models.ticket.get(id)
        .then((ticket) => {
          data = ticket;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },

  update: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params, body } = req;
      const { id } = params;
      await models.ticket.update(id, body)
        .then((ticket) => {
          data = ticket;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
};
