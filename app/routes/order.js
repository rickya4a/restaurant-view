import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderRoute extends Route {
  @service('shopping-cart') cart;

  model() {
    let response = this.cart.listCart();

    if (response.length > 0) return response;

    return false;
  }
}
