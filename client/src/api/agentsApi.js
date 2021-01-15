import { instance, apiGetData } from './index';

export default class {
  static get(id) {
    return instance.get(`agents/${id}`).then(apiGetData);
  }
}