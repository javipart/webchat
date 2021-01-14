import axios from 'axios';
const SERVER = 'http://localhost:3010/api/v1/';


export const instance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGetData = response => response.data;


export default instance;
