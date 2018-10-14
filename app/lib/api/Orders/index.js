import config from './config';

export default class Orders {

  constructor(http) {
    this.http = http;
  }

  add(data) {
    return this.http.post(config.ADD, {
      ...data
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

  getSingle(order_id) {
    return this.http.get(`${config.GET_SINGLE}/${order_id}`);
  }

}
