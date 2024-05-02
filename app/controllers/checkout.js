import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';
import config from 'restaurant-view/config/environment';

export default class CheckoutController extends Controller {
  @service('shopping-cart') cart;
  @service router;
  @service session;

  @action
  async submitData() {
    let response = await this.cart.listCart();

    let sum =
      response.length > 1
        ? response.reduce(function (prev, curr) {
            return {
              total_price:
                Number(parseInt(prev.total, 10).toFixed()) +
                Number(parseInt(curr.total, 10).toFixed()),
              total_quantity: prev.count + curr.count,
            };
          })
        : {
            total_price: Number(parseInt(response[0].total, 10).toFixed()),
            total_quantity: response[0].count,
          };

    let postOrders = await axios.post(
      `${config.APP.DOMAIN}/api/Orders`,
      {
        ...sum,
        customerId: this.session.data.authenticated.userId,
      },
      {
        params: {
          access_token: this.session.data.authenticated.token,
        },
      },
    );

    let itemOrder = response.map((el) => {
      return {
        itemId: el.id,
        orderId: postOrders.data.id,
      };
    });

    let postItemOrder = await axios.post(
      `${config.APP.DOMAIN}/api/ItemOrders`,
      itemOrder,
      {
        params: {
          access_token: this.session.data.authenticated.token,
        },
      },
    );

    if (postItemOrder.status === 200) {
      alert('Order has been submitted');
      localStorage.removeItem('shoppingCart');
      this.router.refresh();
    } else {
      alert('Failed to submit order');
    }
  }
}
