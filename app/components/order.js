import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class OrderComponent extends Component {
  @service('shopping-cart') cart;
  @service router;

  @action
  addItemToCart(dish) {
    this.cart.addItemToCart(dish);
    this.router.refresh();
  }

  @action
  removeItemFromCart(dish) {
    this.cart.removeItemFromCart(dish);
    this.router.refresh();
  }

  @action
  setCountItem(dish, count) {
    this.cart.setCountForItem(dish, count);
    this.router.refresh();
  }

  @action
  removeAllItemFromCart(dish) {
    this.cart.removeAllItemFromCart(dish);
    this.router.refresh();
  }
}
