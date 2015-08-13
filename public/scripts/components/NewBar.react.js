var React = require('react');
var BarsActions = require('../actions/BarsActionCreators');

var NewBar = React.createClass({

  getInitialState(){
    return {
      barName: ''
    };
  },

  render(){
    return (
        <form className="pure-form">
        <fieldset>
            <input type="text" value={this.state.barName} onChange={this.handleChange} className="new-bar"/>
            <button type="submit" className="pure-button pure-button-primary" onClick={this.handleClick}>Add</button>
          </fieldset>
        </form>
    );
  },

  handleClick(event) {
    event.preventDefault();
    BarsActions.createBar(this.state.barName);
  },

  handleChange(event) {
    this.setState({barName: event.target.value});
  }
});

module.exports = NewBar;
