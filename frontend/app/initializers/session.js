import Ember    from 'ember'
import Session  from 'simple-auth/session'
import AuthBase from 'simple-auth/authenticators/base'

Session.reopen({
  user: function() {
    let userId = this.get('userId')

    if (userId) {
      return this.container.lookup('store:main').find('user', userId)
    }
  }.property('userId')
})

let Authenticator = AuthBase.extend({
  authenticate(credentials) {
    let { identification: username, password } = credentials

    return new Ember.RSVP.Promise((resolve, reject) =>
      Ember.$.ajax({
        url:         '/api/v1/login'
      , type:        'POST'
      , dataType:    'json'
      , contentType: 'application/json'
      , data:        JSON.stringify({ username, password })
      })
      .then(resolve)
      .fail(xhr => {
        let error

        try {
          error = JSON.parse(xhr.responseText)
        }
        catch (e) {
          error = xhr.responseText
        }

        reject(error)
      })
    )
  }
, restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.sessionId)) {
        resolve(data)
      }
      else {
        reject()
      }
    })
  }
, invalidate() {
    return Ember.$.post('/api/v1/logout')
  }
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize: function(container) {
    container.register('authenticator:custom', Authenticator)
  }
}
