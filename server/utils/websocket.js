const RestClient = require('./restClient');


module.exports = class Websocket extends RestClient {
  constructor(events) {
    super('http://172.30.0.1:3011/', 'Websocket');
    this.events = events;
  }

  event(event, data) {
    const title = '[EVENT DISPATCH]';
    this.dataSend = { event, data };
    return this.sendData('event', 'post')
      .then((result) => {
        const { success, data: response } = result;
        if (!success) {
          throw new Error(response);
        }
        console.log(`${title} Dispatch ${event}: ${response}`);
      })
      .catch((err) => {
        console.log(`${title} Error ${event}: ${err.message}`);
      });
  }
};
