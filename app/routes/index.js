/* eslint-disable no-unused-vars */
import Route from '@ember/routing/route';
import config from 'restaurant-view/config/environment';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service session;

  async model() {
    let response = await fetch(`${config.APP.DOMAIN}/api/Items`);
    let data = await response.json();

    return data;
  }
}
