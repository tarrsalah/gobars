var React = require('react');

var BarsList = React.createClass({

  render: function(){
	return (
	  <ul>
		{this.props.bars.map(function(bar){
		  return (
			  <BarItem key={bar.id} text={bar.name}/>
		  );
		})}
	  </ul>
	);
  }
});


var BarItem = React.createClass({

  render: function(){
	return (
		<li className="bar-item">{this.props.text}</li>
	);
  }
});

module.exports = BarsList;
