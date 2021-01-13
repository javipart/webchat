
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params } = req;
      const { } = params;
      await models.ticket.create()
        .then((room) => {
          data = room;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.json({ success: result, data });
  },
};
