import Route from '@ember/routing/route';
import config from 'restaurant-view/config/environment';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch(`${config.APP.DOMAIN}/api/Items`);
    let data = await response.json();

    return data;
  }
}
