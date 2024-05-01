import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderRoute extends Route {
  @service('shopping-cart') cart;
  @service session;

  beforeModel(transition) {
    this.session.setup();
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    let response = this.cart.listCart();

    if (response.length > 0) return response;

    return false;
  }
}
