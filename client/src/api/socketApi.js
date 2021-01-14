import io from 'socket.io-client';
const SERVER_SOCKET = 'http://localhost:3011/';

const listener = io(SERVER_SOCKET);

export default {
  io: listener,
  connect: (event, cb) => {
    listener.on(event, cb);
  },
  disconnect: (event, cb) => {
    listener.off(event, cb);
  },
};
