
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      await models.room.create(body)
        .then((room) => {
          data = room.shift();
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
      const { models, body, websocket } = req;
      const { id, data: chat } = body;
      await models.room.pushMessage(id, chat)
        .then((message) => {
          data = message;
          result = true;
        });
      websocket.emitEvent(`${websocket.events.message}-${idBusiness}`, chat.data);
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },

  getAgent: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body } = req;
      await models.room.getAgent(body)
        .then((room) => {
          data = room;
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
      const { models, body } = req;
      await models.room.get(body)
        .then((room) => {
          data = room;
          result = true;
        });
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },
};
