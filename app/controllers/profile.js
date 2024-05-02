import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';
import config from 'restaurant-view/config/environment';

export default class ProfileController extends Controller {
  @service session;
  @service router;

  @tracked error;

  @action
  async sendUpdate(e) {
    e.preventDefault();

    let { email, fullName } = this;
    try {
      let auth = await axios.patch(
        `${config.APP.DOMAIN}/api/Customers/${this.session.data.authenticated.userId}`,
        {
          email,
          fullName,
        },
        {
          params: {
            access_token: this.session.data.authenticated.token,
          },
        },
      );
      if (auth.status == 200) {
        this.router.transitionTo('index');
      }
    } catch (error) {
      console.log(error);
    }
  }

  @action
  update(attr, e) {
    this[attr] = e.target.value;
  }
}
