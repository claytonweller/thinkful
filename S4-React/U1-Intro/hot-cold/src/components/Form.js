import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  submitGuess(e) {
    e.preventDefault();
    this.setState({ inputValue: "" });
    this.props.makeGuess(this.state.inputValue);
  }

  trackInputValue(value) {
    this.setState({ inputValue: parseInt(value, 10) });
  }

  render() {
    if (this.props.theyGotIt) {
      return (
        <button
          className="start-over-button"
          onClick={() => this.props.startOver()}
        >
          Try again
        </button>
      );
    } else {
      return (
        <form className="guess-form">
          <label>
            Make a guess!
            <br />
            <input
              value={this.state.inputValue}
              onChange={e => this.trackInputValue(e.target.value)}
              type="number"
              min={1}
              max={100}
              placeholder="1 to 100"
            />
          </label>
          <button onClick={e => this.submitGuess(e)}>
            I'm pretty sure this is it...
          </button>
        </form>
      );
    }
  }
}
