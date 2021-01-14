
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      console.log(body)
      await models.room.create(body)
        .then((room) => {
          data = room;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },

  pushMessage: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      const { id, data: chat } = body;
      await models.room.pushMessage(id, chat)
        .then((message) => {
          data = message;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
};
