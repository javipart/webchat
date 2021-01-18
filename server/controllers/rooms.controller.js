
module.exports = {
  create: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, body, websocket } = req;
      await models.room.saveData(body)
        .then((room) => {
          data = room;  
          result = true;
          websocket.emitEvent(websocket.events.newRoom, room);
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
          chat.date = new Date();
        });
      websocket.emitEvent(`${websocket.events.message}-${id}`, chat);
    } catch (err) {
      return next(err);
    }
    return res.response(result, data);
  },

  getAgent: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params } = req;
      const { doc } = params
      await models.room.getAgent(doc)
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

  get: async (req, res, next) => {
    let result = false;
    let { default: data = '' } = req;
    try {
      const { models, params } = req;
      const { id } = params;
      await models.room.get(id)
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
