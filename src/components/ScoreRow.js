import React, { Component } from 'react';
import '../styles/ScoreRow.css';

class ScoreRow extends Component {
  render() {

    // make time more readable
    let time = this.props.convertToMin(this.props.time);

    return(
      <div className="ScoreRow">
        <li>
          <span className="ScoreRow-name">{this.props.name}</span>, {this.props.attempts} attempts, {time}
        </li>
      </div>
    );
  }
}

export default ScoreRow;
