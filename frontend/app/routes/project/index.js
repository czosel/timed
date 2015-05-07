import Ember from 'ember'

export default Ember.Route.extend({
  queryParams: {
    customer: { refreshModel: true, replace: true }
  }

, setupController(controller, model) {
    this._super(controller, model)

    controller.set('customers', this.store.all('customer'))
  }

, beforeModel() {
    return this.store.find('customer')
  }

, model({ customerId: customer }) {
    if (!customer || customer === 'null') {
      return this.store.find('project')
    }

    return this.store.filter('project', { customer }, project =>
      project.get('customer.id') === customer
    )
  }
})
