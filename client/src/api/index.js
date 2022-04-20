import axios from 'axios';
const SERVER = 'http://127.0.01:3010/api/v1/';


export const instance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGetData = response => response.data;


export default instance;
