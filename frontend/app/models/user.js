import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'name':        DS.attr('string')
, 'firstName':   DS.attr('string')
, 'lastName':    DS.attr('string')
, 'password':    DS.attr('string')
, 'worktime':    DS.attr('any', { 'defaultValue': {} })
, 'projects':    DS.hasMany('project', { 'async': true })
  // TODO: This should be async and needs its own backend route.
, 'attendances': DS.hasMany('attendance')

, 'fullName': function() {
    return `${this.get('firstName')||''} ${this.get('lastName')||''}`.trim()
  }.property('firstName', 'lastName')

  // TODO: We should probably sort the attendances by date
, 'currentAttendance': function() {
    return this.get('attendances').get('lastObject')
  }.property('attendances')
, 'currentActivity': function() {
    var attendance = this.get('currentAttendance')

    return attendance ? attendance.get('activities').get('lastObject') : null
  }.property('currentAttendance.activities')

, 'startAttendance': function(from = moment.utc(), to = null) {
    var attendance = this.store.createRecord('attendance', { 'user': this
                                                           , 'from': from
                                                           , 'to':   to
                                                           })

    this.get('attendances').addObject(attendance)

    return attendance
  }
, 'startActivity': function(task, from = moment.utc(), to = null) {
    this.endCurrentActivity()

    var attendance = this.get('currentAttendance')

    if (!attendance || attendance.get('to') && attendance.get('to').isValid()) {
      attendance = this.startAttendance(from)
    }

    var activity = this.store.createRecord('activity', { 'attendance': attendance
                                                       , 'task':       task
                                                       , 'from':       from
                                                       , 'to':         to
                                                       })

    attendance.get('activities').addObject(activity)

    return activity
  }
, 'endCurrentAttendance': function() {
    var attendance = this.get('currentAttendance')

    if (attendance) {
      this.endCurrentActivity()
      attendance.end()
    }
  }
, 'endCurrentActivity': function() {
    var activity = this.get('currentActivity')

    if (activity) {
      activity.end()
    }
  }
, 'getAttendancesByDay': function(day = moment.utc().startOf('day')) {
    return this.get('attendances').filter(attendance => !attendance.get('from').startOf('day').diff(day))
  }
})
