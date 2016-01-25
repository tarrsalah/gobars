var React = require('react');
var PropTypes = React.PropTypes;

class Bars extends React.Component {
  render() {
    return (
        <div id="bars">
          <ul>
            {this.props.bars.map((bar, index) => {
              return (<li key={index}>{bar.name}</li>);
            })}
          </ul>
        </div>
    );
  }
}


Bars.propTypes= {
  bars: PropTypes.arrayOf(PropTypes.object).isRequired
};

module.exports = Bars;
