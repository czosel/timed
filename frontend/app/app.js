/* globals define, moment, vis, io, ramjet */

import Ember            from 'ember'
import Resolver         from 'ember/resolver'
import loadInitializers from 'ember/load-initializers'
import config           from './config/environment'
import Notify           from 'ember-notify'

Ember.MODEL_FACTORY_INJECTIONS = true

let App = Ember.Application.extend({
  'modulePrefix':    config.modulePrefix
, 'podModulePrefix': config.podModulePrefix
, 'Resolver':        Resolver
})

define('ramjet', () => Object({
  'default': ramjet
}))

define('moment', () => Object({
  'default': moment
}))

define('socket.io', () => Object({
  'default': io
}))

define('vis', () => Object({
  'default':  vis
, 'Timeline': vis.Timeline
, 'DataSet':  vis.DataSet
, 'Graph2d':  vis.Graph2d
}))

Ember.$(window).on('error', ({ originalEvent: { error: err } }) =>
  Notify.error({
    raw: `<pre><strong>${err.name}:</strong> ${err.message}\n${err.stack}</pre>`
  , closeAfter: null
  })
)

loadInitializers(App, config.modulePrefix)

export default App
