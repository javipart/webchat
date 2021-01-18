import { instance, apiGetData } from './index';

export default class {
  static save(data) {
    return instance.post('tickets', data).then(apiGetData);
  }
  static get(id) {
    return instance.get(`tickeets/${id}`).then(apiGetData);
  }
}