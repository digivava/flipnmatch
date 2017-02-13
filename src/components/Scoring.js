import React, { Component } from 'react';
import YouWin from './YouWin.js';
import Timer from './Timer.js';
import '../styles/Scoring.css';

class Scoring extends Component {

  render() {

    let convertToMin = this.convertToMin.bind(this);

    return(
      <div className="Scoring">
        { this.props.win ? <YouWin attempts={this.props.attempts} time={this.props.seconds} onRestart={this.props.onRestart} convertToMin={convertToMin}/> : null }
        <div className="Scoring-attempts">
          {"Attempts: " + this.props.attempts}
        </div>
        <div className="Scoring-timer">
          <Timer seconds={this.props.seconds} convertToMin={convertToMin} />
        </div>
      </div>
    );
  }

  ////// TIME RENDERING //////

  convertToMin(seconds) {
    let mins = Math.floor(seconds / 60);

    let secs = this.prettySeconds(seconds % 60);

    return String(mins) + ":" + String(secs);
  }

  prettySeconds(seconds) {
    // if it's a one-digit number, add a 0 in front
    if (String(seconds).length === 1) {
      seconds = "0" + seconds;
    }
    return seconds;
  }

}

export default Scoring;
