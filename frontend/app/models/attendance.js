import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  'user':       DS.belongsTo('user')
, 'activities': DS.hasMany('activity')
, 'from':       DS.attr('utc')
, 'to':         DS.attr('utc')

, 'end': function() {
    this.set('to', moment())
  }
})