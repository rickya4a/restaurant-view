import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CheckoutRoute extends Route {
  @service('shopping-cart') cart;
  @service session;

  beforeModel(transition) {
    this.session.setup();
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let response = await this.cart.listCart();

    return response;
  }
}
