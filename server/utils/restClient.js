const axios = require('axios');

module.exports = class RestClient {
  constructor(host, name, timeout = 5000) {
    this.host = host;
    this.name = name;
    this.instance = axios.create({
      baseURL: this.host,
      headers: { 'Content-Type': 'application/json' },
      timeout,
    });
    this.dataSend = {};
  }

  sendData($route, method = 'post') {
    console.log(`>> [${method.toUpperCase()}] ${this.host}${$route} `);
    if (this.print) {
      console.log(`>>> ${JSON.stringify(this.dataSend)}`);
    }
    switch (method) {
      case 'get':
        return this.instance.get($route)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
      case 'put':
        return this.instance.put($route, this.dataSend)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
      case 'delete':
        return this.instance.delete($route)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
      default:
        return this.instance.post($route, this.dataSend)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
    }
  }

  sendDataThen(response) {
    const { data, status } = this.constructor.dataResponse(response);
    if (status !== 200) {
      throw new Error(data);
    }
    return data;
}

  static sendDataCatch(response) {
    let status = 500;
    let error = new Error(response);
    if (response.errno === 'ECONNREFUSED') {
      error = new Error('No se encuentra disponible.');
      status = constants.error.code;
    }
    error = new Error(`${this.name}: ${error.message}`);
    error.status = status;
    throw error;
  }

  static dataResponse(response) {
    const { data } = response;
    return {
      status: response.status,
      data,
    };
  }
};
