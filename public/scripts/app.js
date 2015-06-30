var React = require('react');
var BarsApp = require('./components/BarsApp.react');
var BarsActionCreators = require('./actions/BarsActionCreators');

BarsActionCreators.initbars();
React.render(<BarsApp/>, document.getElementById("mount"));
