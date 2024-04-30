import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';
import config from 'restaurant-view/config/environment';

export default class CheckoutController extends Controller {
  @service('shopping-cart') cart;

  // TODO: submit data to backend
  @action
  async submitData() {
    let response = await this.cart.listCart();

    let sumData = response.reduce((prev, curr) => {
      return {
        total_price: prev.price + curr.price,
        total_quantity: prev.count + curr.count,
      };
    });

    let post = await axios.post(
      `${config.APP.DOMAIN}api/Orders`,
      {
        ...sumData,
        customerId: 1,
      },
      {
        params: {
          access_token:
            'pNxC1K3cFVkoFoTqV0BL0DwanqPUoQmQgmkHrpmD2XTmmvSEMy69gQN3lJtlsNFi',
        },
      },
    );
    console.log(post);

    console.log(config.APP.DOMAIN);
  }
}
