var React = require('react');
var App = require('./components/App.react');
var BarsActionCreators = require('./actions/BarsActionCreators');

BarsActionCreators.init();
React.render(<App/>, document.getElementById('mount'));
