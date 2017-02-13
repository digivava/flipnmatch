import React, { Component } from 'react';
import Header from './Header.js';
import Game from './Game.js';
import '../styles/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <h1>Memory Game</h1>
        <p className="App-intro">
          Find the pairs of matching cards in as few flips as possible!
        </p>
        <div className="App-game">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
