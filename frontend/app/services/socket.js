import Ember  from 'ember'
import Notify from 'ember-notify'
import io     from 'socket.io'

export default Ember.Service.extend({
  store: Ember.inject.service()

, init() {
    let connection = io({ transports: [ 'websocket' ] })

    this.set('connection', connection)

    connection.on('backend version', version => this.notifyVersion(version))
    connection.on('model', (socketId, data) => {
      if (socketId !== connection.id) {
        this.get('store').pushPayload(data)
      }
    })
    connection.on('unload model', (socketId, type, id) => {
      if (socketId === connection.id) return

      let store = this.get('store')
      let model = store.getById(type, id)

      if (model) {
        store.unloadRecord(model)
      }
    })
  }

, notifyVersion(version) {
    if (!Ember.$('.ember-notify-cn').length) {
      return Ember.run.later(() => this.notifyVersion(version), 1000)
    }

    let app = this.get('application')

    if (app.version !== version && !Ember.$('#reload-application').length) {
      Notify.warning({
        raw: `<a id="reload-application" href="javascript:window.location.reload()">
          A new Timed version is available, please reload now.
        </a>`
      , closeAfter: null
      })
    }
  }
})
