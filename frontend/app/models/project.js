import DS      from 'ember-data'
import Model   from './model'
import Github  from '../utils/autocomplete/github'
import Redmine from '../utils/autocomplete/redmine'

export default Model.extend({
  'name':     DS.attr('string')
, 'customer': DS.belongsTo('customer', { 'async': true })
, 'tasks':    DS.hasMany('task', { 'async': true })
, 'tracker':  DS.attr('object', { 'defaultValue': { 'data': {} } })
, 'from':     DS.attr('moment')
, 'to':       DS.attr('moment')
, 'done':     DS.attr('boolean')

, '_tracker': function() {
    switch (this.get('tracker.type')) {
      case 'github':  return Github.create({ project: this })
      case 'redmine': return Redmine.create({ project: this })
    }
  }.property('tracker.type')

, 'searchIssues': function(term = '') {
    let tracker = this.get('_tracker')

    return tracker.searchIssues(term)
  }
})
