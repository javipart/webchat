import { instance, apiGetData } from './index';

export default class {
  static save(data) {
    return instance.post('rooms', data).then(apiGetData);
  }
}