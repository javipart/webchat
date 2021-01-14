import { instance, apiGetData } from './index';

export default class {
  static save(data) {
    return instance.post('rooms', data).then(apiGetData);
  }
  static pushMessage(data) {
    return instance.post('rooms/message', data).then(apiGetData);
  }
}