import Ember from 'ember';
import moment from 'moment';
import { Timeline } from 'vis';

var ZOOM = 1000 * 60 * 60 * 24 * 7 * 2 // Show ~2 weeks

export default Ember.View.extend({
  'visOptions': {
    'stack':       true
  , 'editable':    true
  , 'orientation': 'top'
  , 'autoResize':  false
  , 'zoomMin':     ZOOM
  }

, 'assignments': Ember.computed.alias('controller.model.users.@each.assignments')

, 'flatAssignments': function() {
    return this.get('assignments').reduce((all, assignments) => {
      assignments.forEach(assignment => all.push(assignment))

      return all
    }, [])
  }.property('assignments.@each')

, 'visGroups': function() {
    return this.get('controller.users').map(user => ({
      'id':      user.id
    , 'content': user.get('longName')
    }))
  }.property('controller.users')

, 'visItems': function() {
    return this.get('flatAssignments').map(assignment => {
      var title = `${assignment.get('project.name')} (${assignment.get('potentialWorktime')} hours)`

      return {
        'id':      assignment.id
      , 'content': title
      , 'title':   title
      , 'start':   assignment.get('from')
      , 'end':     assignment.get('to')
      , 'group':   assignment.get('user.id')
      }
    })
  }.property(
    'flatAssignments.@each.from'
  , 'flatAssignments.@each.to'
  , 'flatAssignments.@each.project'
  )

, 'renderTimeline': function() {
    var timeline = this.get('timeline')

    timeline.setGroups(this.get('visGroups'))
    timeline.setItems(this.get('visItems'))
  }.observes('visGroups', 'visItems')

, 'setupTimeline': function() {
    var options = Ember.$.extend({}, this.get('visOptions'), {
      'start':    moment().subtract(1, 'month').startOf('month')
    , 'end':      moment().add(1, 'month').endOf('month')
    , 'onAdd':    (item, callback) => this.controller.send('add',    item, callback)
    , 'onUpdate': (item, callback) => this.controller.send('update', item, callback)
    , 'onMove':   (item, callback) => this.controller.send('move',   item, callback)
    , 'onRemove': (item, callback) => this.controller.send('remove', item, callback)
    })

    this.set('timeline', new Timeline(
      this.$()[0]
    , null
    , options
    ))

    this.renderTimeline()
  }.on('didInsertElement')
})
