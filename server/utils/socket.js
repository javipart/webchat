const Websocket = require('./websocket');

const events = {
  message: 'MESSAGE',
  newRoom: 'NEW_ROOM',
};

const emitEvent = (event, data) => {
  new Websocket(events).event(event, data);
  return true;
};

module.exports = { emitEvent, events };
