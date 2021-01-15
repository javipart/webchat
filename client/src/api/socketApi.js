import io from 'socket.io-client';
import events from '../models/events';
const SERVER_SOCKET = 'http://localhost:3011/';

let listener;
export const initSocket = () => {
  console.log('Intenta')
  listener = io(SERVER_SOCKET);
  if (listener) console.log('Holaaaaaaa');
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(listener) listener.disconnect();
}
export const subscribeToChat = (id, pushMessage) => {
  console.log(id)
  console.log('Intenta evento')
  if (!listener) return(true);
  listener.on(`${events.message}-${id}`, msg => {
    console.log('Websocket event received!');
    pushMessage(msg);
  });
}
export const sendMessageChat = (id, message) => {
  if (listener) listener.emit(`${events.message}-${id}`, { message });
}
