var React = require('react');
var NewBar = require('./NewBar.react');
var BarsList = require('./BarsList.react');
var BarsStore = require('../stores/BarsStore');

var BarsApp = React.createClass({

  getInitialState: function(){
    return {
      bars: BarsStore.getAll(),
      loading: BarsStore.isLoading()
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
      bars: BarsStore.getAll(),
      loading: BarsStore.isLoading()
    });
  },

  loading: function() {
    if (this.state.loading) {
      return <span>loading...</span>;
    } else {
      return null;
    }
  },

  render: function() {
    return (
        <div className="wrapper">
            <h1>Bars</h1>
            {this.loading()}
            <NewBar/>
            <BarsList bars={this.state.bars}/>
        </div>
    );
  }
});



module.exports = BarsApp;
