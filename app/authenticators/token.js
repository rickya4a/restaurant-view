/* eslint-disable no-unused-vars */
import Base from 'ember-simple-auth/authenticators/base';
import axios from 'axios';
import config from 'restaurant-view/config/environment';

export default class Token extends Base {
  async restore(data) {
    let { token } = data;
    if (token) return data;

    throw 'invalid data';
  }

  async authenticate(username, password) {
    try {
      let auth = await axios.post(`${config.APP.DOMAIN}/api/Customers/login`, {
        username,
        password,
      });
      return { token: auth.data.id };
    } catch (error) {
      console.log(error);
    }
  }
}
