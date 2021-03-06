import config from './config';

export default class Category {

  constructor(http) {
    this.http = http;
  }

  add(name, singular, description) {
    return this.http.post(config.ADD, {
      name,
      singular,
      description
    });
  }

  edit(category_id, name, singular, description) {
    return this.http.patch(`${config.EDIT}/${category_id}`, {
      name,
      singular,
      description
    });
  }

  getList() {
    return this.http.get(config.GET_LIST);
  }

}
