import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span'
, title: function() {
    return this.get('isTracking') ? 'Stop tracking attendance' : 'Track attendance'
  }.property('isTracking')
, label: function() {
    let attendance = this.get('session.user.currentAttendance')

    if (!attendance) {
      return ''
    }

    let from      = attendance.get('from')
      , to        = attendance.get('to')
      , today     = moment().startOf('day')
      , fromToday = moment(from).startOf('day').diff(today)
      , tformat   = 'hh:mm'
      , ntformat  = 'YYYY-MM-DD hh:mm'
      , label     = from.format(fromToday ? ntformat : tformat)

    if (to && to.isValid()) {
      let toToday = moment(to).startOf('day').diff(today)

      label = `${label} - ${to.format(toToday ? ntformat : tformat)}`
    }
    else {
      label = `${label} - <span data-from-now="true" data-from="${from}">${from.fromNow(true)}</span>`
      label = new Ember.Handlebars.SafeString(label)
    }

    return label
  }.property('session.user.currentAttendance.from', 'session.user.currentAttendance.to', 'refreshLabel')
, fixTooltip: function() {
    let tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  }.observes('title')
, isTracking: function() {
    let attendance = this.get('session.user.currentAttendance')
      , to         = attendance && attendance.get('to')

    return to && !to.isValid()
  }.property('session.user.currentAttendance.to')
, actions: {
    track: function() {
      this.get('session.user').then(user => {
        let attendance = this.get('isTracking') ?
          user.endCurrentAttendance() :
          user.startAttendance()

        attendance.save()
      })
    }
  }
})
