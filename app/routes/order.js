import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderRoute extends Route {
  @service('shopping-cart') cart;

  async model() {
    let response = await this.cart.listCart();
    return response;
  }
}
