import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('http://localhost:3000/api/Items');
    let data = await response.json();

    return data;
  }
}
