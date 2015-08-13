var React = require('react');
var NewBar = require('./NewBar.react');
var BarsList = require('./BarsList.react');
var BarsStore = require('../stores/BarsStore');

var App = React.createClass({

  getInitialState() {
    return {
      bars: BarsStore.getAll(),
      loading: BarsStore.isLoading()
    };
  },

  componentDidMount() {
    BarsStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount() {
    BarsStore.removeChangeListener(this.handleChange);
  },

  handleChange() {
    this.setState({
      bars: BarsStore.getAll(),
      loading: BarsStore.isLoading()
    });
  },

  isLoading() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else {
      return null;
    }
  },

  render() {
    return (
        <div className="wrapper">
            <h1>Bars</h1>
            {this.isLoading()}
            <NewBar/>
            <BarsList bars={this.state.bars}/>
        </div>
    );
  }
});



module.exports = App;
