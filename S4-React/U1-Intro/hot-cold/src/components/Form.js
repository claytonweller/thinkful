import React, { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0
    };
  }

  submitGuess(e) {
    e.preventDefault();
    document.getElementById("number-input").value = "";
    this.props.makeGuess(this.state.inputValue);
  }

  trackInputValue(value) {
    this.setState({ inputValue: parseInt(value, 10) });
  }

  render() {
    if (this.props.theyGotIt) {
      return <button onClick={() => this.props.startOver()}>Try again</button>;
    } else {
      return (
        <form>
          <label>
            Make a guess!
            <br />
            <input
              id="number-input"
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
