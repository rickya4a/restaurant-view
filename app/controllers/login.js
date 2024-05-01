import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;
  @service router;

  @tracked error;

  @action
  async login(e) {
    e.preventDefault();

    let { username, password } = this;

    try {
      await this.session.authenticate(
        'authenticator:token',
        username,
        password,
      );
    } catch (error) {
      this.error = error.error || error;
    }

    if (this.session.isAuthenticated) {
      this.router.transitionTo('index');
    }
  }

  @action
  update(attr, e) {
    this[attr] = e.target.value;
  }
}
