
module.exports = {
    get: async (req, res, next) => {
      let result = false;
      let { default: data = '' } = req;
      try {
        const { models, params } = req;
        const { doc } = params;
        await models.agent.get(doc)
          .then((agent) => {
            data = agent;
            result = true;
          });
      } catch (err) {
        return next(err);
      }
      return res.response(result, data);
    },
  };
  