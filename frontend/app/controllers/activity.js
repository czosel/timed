import Ember from 'ember';

export default Ember.ArrayController.extend({
  // TODO: Implement user and team filter.
  queryParams: [ 'from', 'to', 'user', 'team' ]

, updateDateFilter: function() {
    this.set('from', +this.get('momentFrom'))
    this.set('to',   +this.get('momentTo'))
  }.observes('momentFrom', 'momentTo')

, attendances: function() {
    var from = this.get('from')
    var to   = this.get('to')
    var user = this.get('user')
    var team = this.get('team')

    return this.store.find('attendance', { from, to, user, team })
  }.property('from', 'to', 'user', 'team')

, activities: function() {
    var activities = []

    this.get('attendances').forEach(attendance => {
      attendance.get('activities').forEach(activity => activities.push(activity))
    })

    return activities
  }.property('attendances.@each')
})
