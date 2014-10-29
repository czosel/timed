import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  'attrs': {
    'attendances': { 'embedded': 'always' }
  , 'assignments': { 'embedded': 'always' }
  }
})
