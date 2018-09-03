import React, { Component } from "react";
import Feedback from "./Feedback.js";
import Form from "./Form.js";
import GuessCounter from "./GuessCounter";
import PreviousGuesses from "./PreviousGuesses";

export default class HotOrCold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theOneTrueNumber: Math.floor(Math.random() * 100) + 1,
      currentGuess: 0,
      lastGuess: 0,
      previousGuesses: [],
      theyGotIt: false
    };
  }

  makeGuess(value) {
    this.setState({
      currentGuess: value,
      lastGuess: this.state.currentGuess,
      previousGuesses: [...this.state.previousGuesses, value]
    });
  }

  startOver() {
    this.setState({
      theOneTrueNumber: Math.floor(Math.random() * 100) + 1,
      currentGuess: 0,
      lastGuess: 0,
      previousGuesses: [],
      theyGotIt: false
    });
  }

  componentDidUpdate() {
    if (
      (this.state.currentGuess === this.state.theOneTrueNumber) &
      !this.state.theyGotIt
    ) {
      this.setState({ theyGotIt: true });
    }
  }

  render() {
    return (
      <div>
        <Feedback
          currentGuess={this.state.currentGuess}
          lastGuess={this.state.lastGuess}
          theOneTrueNumber={this.state.theOneTrueNumber}
        />
        <Form
          startOver={() => this.startOver()}
          theyGotIt={this.state.theyGotIt}
          makeGuess={value => this.makeGuess(value)}
        />
        <GuessCounter guessCount={this.state.previousGuesses.length} />
        <PreviousGuesses previousGuesses={this.state.previousGuesses} />
      </div>
    );
  }
}
