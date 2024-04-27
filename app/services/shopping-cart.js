import Service from '@ember/service';
import { A } from '@ember/array';

class Item {
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
}

export default class ShoppingCartService extends Service {
  cart = A([]);

  saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }

  addItemToCart(dish) {
    for (let item in this.cart) {
      if (this.cart[item].name === dish.name) {
        this.cart[item].count++;
        this.saveCart();
        return;
      }
    }

    let item = new Item(dish.name, dish.price, 1);
    this.cart.pushObject(item);
    this.saveCart();
  }

  setCountForItem(dish, count) {
    for (let i in this.cart) {
      if (this.cart[i].name === dish.name) {
        this.cart[i].count = count;
        break;
      }
    }
  }

  removeItemFromCart(dish) {
    for (var item in this.cart) {
      if (this.cart[item].name === dish.name) {
        this.cart[item].count--;
        if (this.cart[item].count === 0) {
          this.cart.splice(item, 1);
        }
        break;
      }
    }
    this.saveCart();
  }

  removeAllItemFromCart(dish) {
    for (let item in this.cart) {
      if (this.cart[item].name === dish.name) {
        this.cart.splice(item, 1);
        break;
      }
    }
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  totalCart() {
    let totalCart = 0;
    for (var item in this.cart) {
      totalCart += this.cart[item].price * this.cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  listCart() {
    let cartCopy = [];
    for (let i in this.cart) {
      let item = this.cart[i];
      let itemCopy = {};

      for (let p in item) {
        itemCopy[p] = item[p];
      }

      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  }
}
