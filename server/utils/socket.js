const Websocket = require('./websocket');

const events = {
  new_event: 'NEW_EVENT',
};

const emitEvent = (event, data) => {
  new Websocket(events).event(event, data);
  return true;
};

module.exports = { emitEvent, events };
