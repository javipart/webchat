const socketIo = require('socket.io');

const io = socketIo();
const socket = {};

io.origins(["http://127.0.0.1:3000"]);

io.on('connection', (connect) => {
  const address = connect.handshake;
  console.log(`Connected from ${address.address}} [Referer: ${address.headers.origin}]`);
  connect.on('disconnect', () => {
    console.log(`Disconnected from ${address.address}} [Referer: ${address.headers.origin}]`);
  });
});

socket.event = (event, data) => new Promise((resolve, reject) => {
  try {
    console.log(`Data dispatched to '${event}': ${JSON.stringify(data)}`);
    io.sockets.emit(event, data);
    resolve(true);
  } catch (err) {
    reject(err);
  }
});

socket.io = io;

module.exports = socket;
