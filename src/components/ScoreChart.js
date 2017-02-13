import React, { Component } from 'react';
import ScoreRow from './ScoreRow.js';
import '../styles/ScoreChart.css';

class ScoreChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      sortParams: "time" // alternatively, "attempts"
    }
    this.getScores(this.state.sortParams);
  }

  render() {

    // text for sorting choice button is opposite of current sorting choice
    let sortOptionText = "";
    if (this.state.sortParams === "time") {
      sortOptionText = "Least Attempts";
    } else {
      sortOptionText = "Best Times";
    }

    // create rows of scorechart, one row per score
    let rows = [];
    for (let score of this.state.scores) {
      rows.push(<ScoreRow key={score.id} name={score.name} attempts={score.attempts} time={score.time} convertToMin={this.props.convertToMin}/>);
    }

    return(
      <div className="ScoreChart">
        <h3>TOP 10 HIGH SCORES</h3>
        <div className="ScoreChart-chart">
          <ol>
            {rows}
          </ol>
        </div>
        <div className="ScoreChart-sortbutton">
          <button onClick={this.onSortButtonClick.bind(this)}>
            View {sortOptionText}
          </button>
        </div>
        <div className="ScoreChart-restartbutton">
          <button onClick={this.props.onRestart}>
            Play Again!
          </button>
        </div>
      </div>
    );
  }

  onSortButtonClick() {
    // get the scores for the sorting params shown on the button
    if (this.state.sortParams === "time") {
      this.setState({sortParams: "attempts"},
        () => {this.getScores(this.state.sortParams);}
      );
    } else {
      this.setState({sortParams: "time"},
        () => {this.getScores(this.state.sortParams);}
      );
    }
  }

  getScores(sortParams) {

    var that = this;

    fetch("http://localhost:3000/scores?sort=" + sortParams, {mode: 'cors'})
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        console.log('Request successful', json);

        let scores = [];
        for (let score of json) {
          scores.push(score);
        }

        that.setState({scores: scores});
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });
  }

}

export default ScoreChart;
