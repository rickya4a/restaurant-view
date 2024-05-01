/* eslint-disable no-unused-vars */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.setup();
    this.session.prohibitAuthentication('index');
  }
}
