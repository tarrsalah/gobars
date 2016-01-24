var React = require('react');
var AddBar = require('../components/AddBar');
var Bars = require('../components/Bars');
var actions = require('../actions').actions;
var connect = require('react-redux').connect;
var bindActionCreators = require('redux').bindActionCreators;

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div>
          <h1>gobars</h1>
          <AddBar asyncAddBar={this.props.asyncAddBar}/>
          <Bars bars={this.props.bars}/>
        </div>
   );
  }
}

function mapStateToProps(state) {
  return {
    bars: state.bars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions,dispatch);
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
