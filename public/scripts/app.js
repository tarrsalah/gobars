var React = require('react');
var App = require('./components/App.react');
var AppActions = require('./actions/AppActionCreators.js');

AppActions.init();
React.render(<App/>, document.getElementById('mount'));
