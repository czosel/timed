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
    return new Ember.RSVP.Promise((resolve, reject) =>
      Ember.$.ajax({
        url:         '/api/v1/login'
      , type:        'POST'
      , dataType:    'json'
      , contentType: 'application/json'
      , data:        JSON.stringify({ 'username': credentials.identification
                                    , 'password': credentials.password
                                    })
      })
      .then(res => Ember.run(() => resolve(res)))
      .fail(xhr => Ember.run(() => {
        let error

        try {
          error = JSON.parse(xhr.responseText)
        }
        catch (e) {
          error = xhr.responseText
        }

        reject(error)
      }))
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
})

export default {
  name: 'session'
, before: 'simple-auth'
, initialize: function(container) {
    container.register('authenticator:custom', Authenticator)
  }
}
