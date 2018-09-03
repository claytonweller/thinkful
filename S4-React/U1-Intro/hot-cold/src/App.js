import React, { Component } from "react";
import HotOrCold from "./components/HotOrCold";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hot or Cold</h1>
        <HotOrCold />
      </div>
    );
  }
}

export default App;
