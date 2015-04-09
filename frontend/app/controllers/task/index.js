import Ember                from 'ember'
import PagedControllerMixin from 'timed/mixins/paged-controller-mixin'

export default Ember.Controller.extend(PagedControllerMixin, {
  modelSort: [ 'customer.name:asc', 'name:asc' ]
})
