import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DishComponent extends Component {
  @service('shopping-cart') cart;

  @action
  addItem(dish) {
    this.cart.addItemToCart(dish);
  }
}
