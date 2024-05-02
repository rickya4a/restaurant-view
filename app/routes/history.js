import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import axios from 'axios';
import config from 'restaurant-view/config/environment';

export default class HistoryRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.setup();
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let condition = {
      where: {
        customerId: this.session.data.authenticated.userId,
      },
    };
    let { data } = await axios.get(`${config.APP.DOMAIN}/api/Orders`, {
      params: {
        filter: JSON.stringify(condition),
        access_token: this.session.data.authenticated.token,
      },
    });

    return data;
  }
}
