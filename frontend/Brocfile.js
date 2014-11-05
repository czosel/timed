/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app')
var app      = new EmberApp({
  'es3Safe':   false
, 'minifyCSS': { 'enabled': true }
})

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import('bower_components/jquery-ui/jquery-ui.js')
app.import('bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.3.custom.css')
app.import('bower_components/jqueryuibootstrap/css/custom-theme/jquery-ui-1.10.3.theme.css')

app.import('bower_components/bootstrap/dist/css/bootstrap.css')
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', { 'destDir': 'fonts' })
app.import('bower_components/bootstrap/dist/js/bootstrap.js')

app.import('bower_components/moment/moment.js', { 'exports': { 'moment': [ 'default' ] } })
app.import('bower_components/moment-range/lib/moment-range.js')

app.import('bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js')
app.import('bower_components/bootstrap-datepicker/css/datepicker3.css')

app.import('bower_components/bootstrap-daterangepicker/daterangepicker.js')
app.import('bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css')

app.import('bower_components/vis/dist/vis.js', { 'exports': { 'vis': [ 'default' ] } })
app.import('bower_components/vis/dist/vis.css')

module.exports = app.toTree()
