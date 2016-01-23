var React= require('react');

class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bar: ''};
  }

  render() {
    return (
        <form className="pure-form">
          <fieldset>
            <input type="text"
              value={this.state.bar}
              onChange={this.handleChange.bind(this)}/>
            <button type="submit"
              className="pure-button pure-button-primary"
                onClick={this.handleClick.bind(this)}>Add</button>
          </fieldset>
        </form>
    );
  }

  handleChange(event) {
    this.setState({bar: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    var bar = this.state.bar.trim();
    if (bar !== '' ) {
      this.props.addBar(this.state.bar.trim());
    }
    this.setState({bar: ''});
  }
}

module.exports = AddBar;
