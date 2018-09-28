import config from './config';

export default class Size {

  constructor(http) {
    this.http = http;
  }

  add(size_id) {
    return this.http.post(config.ADD, {
      size_id,
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

}
