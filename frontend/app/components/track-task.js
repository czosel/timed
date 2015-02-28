import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span'

, title: function() {
    let trackingLabel = this.get('isTracking') ? 'Stop tracking' : 'Track'
    let taskName      = this.get('task.name') || ''

    return `${trackingLabel} ${taskName}`.trim()
  }.property('task.name', 'isTracking')

, fixTooltip: function() {
    let tooltip = this.$('.tip')

    tooltip.prop('title', this.get('title'))
    tooltip.tooltip('fixTitle')

    if (tooltip.is(':hover')) {
      tooltip.tooltip('show')
    }
  }.observes('title')

, isCurrentTask: function() {
    let activity = this.get('session.user.currentActivity')

    return activity && activity.get('task.id') === this.get('task.id')
  }

, isTracking: function() {
    if (this.isCurrentTask()) {
      let to = this.get('session.user.currentActivity.to')

      return to && !to.isValid()
    }

    return false
  }.property('task.id', 'session.user.currentActivity.to')

, glyphicon: function() {
    let isTracking = this.get('isTracking')
    let icon

    if (isTracking) {
      icon = 'record'
    }
    else if (this.isCurrentTask()) {
      icon = 'repeat'
    }
    else {
      icon = 'play'
    }

    return `glyphicon-${icon}`
  }.property('isTracking')

, actions: {
    track() {
      this.get('session.user').then(user => {
        let activity

        if (this.get('isTracking')) {
          activity = user.endCurrentActivity()
        }
        else {
          activity = user.startActivity(this.get('task'))
        }

        activity.save()
      })
    }
  }
})
