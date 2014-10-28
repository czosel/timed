import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({ 'location': config.locationType })

Router.map(function() {
  this.route('login')

  this.resource('project', function() {
    this.route('new')
    this.route('edit', { 'path': '/:project_id' }, function() {
      this.route('edit', { 'path': '/' })
      this.resource('task', function() {
        this.route('new')
        this.route('edit', { 'path': '/:task_id' })
      })
    })
  })

  this.resource('customer', function() {
    this.route('new')
    this.route('edit', { 'path': '/:customer_id' })
  })

  this.resource('team', function() {
    this.route('new')
    this.route('edit', { 'path': '/:team_id' }, function() {
      this.route('edit', { 'path': '/' })
      //this.route('manage')
    })
  })

  this.resource('user', function() {
    this.route('new')
    this.route('edit', { 'path': '/:user_id' }, function() {
      this.route('edit', { 'path': '/' })
      this.route('worktime')
    })
  })

  this.route('about')
  this.route('team/edit/edit');
  this.route('team/edit/new');
})

export default Router
