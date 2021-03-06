import Ember               from 'ember'
import startApp            from '../../../../helpers/start-app'
import { moduleFor/*, test*/ } from 'ember-qunit'
import { skip }            from 'qunit'

let App
let store

moduleFor('controller:project/edit/edit', 'ProjectEditEditController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  setup() {
    App   = startApp()
    store = App.__container__.lookup('store:main')
  }
, teardown() {
    Ember.run(() => App.destroy())
  }
})

// Replace this with your real tests.
skip('it exists', function(assert) {
  var controller = this.subject({ store })
  assert.ok(controller)
})
