var React= require('react');
var ReactDOM= require('react-dom');
var App = require('./containers');
var store = require('./store');
var Provider = require('react-redux').Provider;

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('mount')
);
