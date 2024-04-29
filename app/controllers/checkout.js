import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
// import axios from 'axios';

export default class CheckoutController extends Controller {
  @service('shopping-cart') cart;

  // TODO: submit data to backend
  @action
  async submitData() {
    let response = await this.cart.listCart();

    console.log(response);
  }
}
