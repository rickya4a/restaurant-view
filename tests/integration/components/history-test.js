import { module, test } from 'qunit';
import { setupRenderingTest } from 'restaurant-view/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | history', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<History />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <History>
        template block text
      </History>
    `);

    assert.dom().hasText('template block text');
  });
});
