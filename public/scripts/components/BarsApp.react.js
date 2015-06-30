var React = require('react');
var NewBar = require('./NewBar.react');
var BarsList = require('./BarsList.react');
var BarsStore = require('../stores/BarsStore');

var BarsApp = React.createClass({

  getInitialState: function(){
	return {
	  bars: BarsStore.getAll()
	};
  },

  componentDidMount: function(){
	BarsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
	BarsStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
	this.setState({
	  bars: BarsStore.getAll()
	});
  },

  render: function() {
	return (
	  <div className="wrapper">
		<h1>Bars</h1>
		<NewBar/>
		<BarsList bars={this.state.bars}/>
	  </div>
	);
  }
});



module.exports = BarsApp;
