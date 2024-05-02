import EmberRouter from '@ember/routing/router';
import config from 'restaurant-view/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('order', function () {
    this.route('checkout');
  });
  this.route('checkout');
  this.route('login');
  this.route('history');
  this.route('profile');
});
