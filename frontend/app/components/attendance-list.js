import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  currentDay: null

, init: function() {
    this.set('currentDay', moment().startOf('day'))
    this._super()
  }

, attendances: function() {
    return this.get('user').getAttendancesByDay(this.get('currentDay'))
                           .sort((a, b) => b.get('from').diff(a.get('from')))
  }.property('currentDay', 'user.attendances.@each')

, actions: {
    openModal(...args) {
      this.sendAction('openModal', ...args)
    }
  }
})
