var React = require('react');
var PropTypes = React.PropTypes;

class Bars extends React.Component {
  render() {
    return (
        <div id="bars">
          <ul>
            {this.props.bars.map((bar, index) => {
              return (<li key={index}>{bar}</li>)
            })}
          </ul>
        </div>
    );
  }
}

Bars.propTypes= {
  bars: PropTypes.arrayOf(PropTypes.string).isRequired,
}

module.exports= Bars;
