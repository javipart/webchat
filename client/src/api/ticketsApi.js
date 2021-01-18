import { instance, apiGetData } from './index';

export default class {
  static save(data) {
    return instance.post('tickets', data).then(apiGetData);
  }
  static getAll(id) {
    return instance.get(`tickets/${id}`).then(apiGetData);
  }
  static update(id, data) {
    return instance.put(`tickets/${id}`, data).then(apiGetData);
  }
  static get(id) {
    return instance.get(`tickets/byid/${id}`).then(apiGetData);
  }
}