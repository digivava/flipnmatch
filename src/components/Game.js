import React, { Component } from 'react';
import Board from './Board.js';
import Scoring from './Scoring.js';
import StartButton from './StartButton.js';
import '../styles/Game.css';

class Game extends Component {

  constructor(props) {
    super(props);

    this.totalPairs = 6; // change this to determine number of cards
    this.lastFlippedCard = null;

    var savedState = this.checkSavedState();
    if (savedState) {
      // start from number of matches we left off on
      this.matched = savedState.matched;
    } else {
      this.matched = 0; // game ends when matched == totalPairs
    }

    this.state = {
      cannotFlip: true,
      gameStarted: false,
      attempts: 0,
      seconds: 0,
      win: false
    }
  }

  render() {

    let gameStart = this.gameStart.bind(this);
    let flipCard = this.flipCard.bind(this);

    // render the gameboard and the scoring, unless you've won the game, in which case just render the scoring
    return (
      <div className="Game">
        {this.state.win ? null :
          <div className="Game-main">
            <div className="Game-startbutton">
              <StartButton onClick={this.gameStart.bind(this)} hide={this.state.gameStarted} />
            </div>
            <div className="Game-board">

              <Board flipCard={flipCard} totalPairs={this.totalPairs} cannotFlip={this.state.cannotFlip} gameStarted={this.state.gameStarted} />
            </div>
          </div>
        }

        <div className="Game-scoring">
          {this.state.gameStarted ? <Scoring attempts={this.state.attempts} seconds={this.state.seconds} win={this.state.win} onRestart={gameStart}/> : null }
        </div>
      </div>
    );
  }

  ///// STATE PERSISTENCE /////

  checkSavedState() {
    // check local storage
    var game = localStorage.getItem('game');

    if (game) {
      return JSON.parse(game);
    } else {
      return false;
    }
  }

  saveState() {
    // add current game variables to local storage
    // note: cannot save lastFlippedCard, it's a dom element, meaning we must only save after successful match so that we're always starting game on first flip

    // find out if this card already exists in localStorage
    let storedGame = this.checkSavedState();

    // replace object if it already exists, otherwise create
    if (storedGame) {
      storedGame.matched = this.matched;
      localStorage.setItem('game', JSON.stringify(storedGame))
    } else {
      let newGame = {
        matched: this.matched
      }
      localStorage.setItem('game', JSON.stringify(newGame))
    }
  }

  ///// GAME LOGIC /////

  gameStart() {

    var savedState = this.checkSavedState();

    if (savedState) {
      this.matched = savedState.matched;
    } else {
      this.matched = 0;
    }

    this.lastFlippedCard = null;
    this.setState({
      attempts: 0,
      gameStarted: true,
      cannotFlip: false,
      seconds: 0,
      win: false
    });

    // start timer
    this.start = Date.now();
    this.interval = setInterval(this.timePasses.bind(this), 100);
  }

  checkWin() {
    // if all pairs have been matched, you win!
    if (this.matched === this.totalPairs) {
      setTimeout(() => {
        this.setState({win: true})
        // clear any saved board state
        localStorage.clear();
      }, 1000);

      // stop timer
      clearInterval(this.interval);
    }
  }

  timePasses() {
    // get difference between current time and when we first pressed start button
    var delta = Date.now() - this.start; // milliseconds elapsed since start

    // update state
    let newSeconds = Math.floor(delta / 1000);
    this.setState({seconds: newSeconds});
  }

  flipCard(card) {
    // can't flip cards when the game is paused, and can't flip same card twice
    if (this.state.cannotFlip || card.state.flipStatus) {
      return;
    }

    // flip the card
    card.setState({flipStatus: "flipped"}, () => {
      // keep track of last flipped card
        if (!this.lastFlippedCard) {
          this.lastFlippedCard = card;
          return;
        }

        this.checkMatch(card);

        // after second flip, user has done 1 attempt
        let prevAttempts = this.state.attempts; // so as not to mutate state directly
        this.setState({attempts: prevAttempts += 1});
      })
  }

  checkMatch(card) {
    // if this card and the previous card have the same id
    if (card.props.id === this.lastFlippedCard.props.id) {
      // match:
      this.match(card);
    } else {
      // no match:
      this.noMatch(card);
    }
  }

  match(card) {
    // stay flipped, this is now a match
    this.matched += 1;
    this.checkWin();

    // save that this card and previous one have been matched and thus flipped
    this.lastFlippedCard.saveState();
    card.saveState()

    // save game variables
    this.saveState();

    this.lastFlippedCard = null;
  }

  noMatch(card) {
    // pause game
    this.setState({cannotFlip: true});
    // flip cards back over
    this.unflip(card);
  }

  unflip(card) {
    // wait a bit so user can see contents, then flip cards back over, unpause game
    setTimeout(() => {
      card.setState({flipStatus: false});
      this.lastFlippedCard.setState({flipStatus: false}, () => {this.lastFlippedCard = null;});
      this.setState({cannotFlip: false});
    }, 800);
  }
}

export default Game;
