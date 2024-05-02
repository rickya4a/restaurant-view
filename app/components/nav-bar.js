import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
  @service session;

  @action
  async logout() {
    await this.session.invalidate();
  }
}
