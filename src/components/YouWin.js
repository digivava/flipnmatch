import React, { Component } from 'react';
import Form from './Form.js';
import ScoreChart from './ScoreChart.js'
import '../styles/YouWin.css';

class YouWin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scoreSubmitted: false
    };
  }

  render() {
    let onFinished = this.onFinished.bind(this);

    // give us a form to submit name, then give us the scorechart
    return (
      <div className="YouWin">
        <h2>YOU WIN!!</h2>
        {this.state.scoreSubmitted ?
          <ScoreChart onRestart={this.props.onRestart} convertToMin={this.props.convertToMin}/> :
          <Form attempts={this.props.attempts} time={this.props.time} onFinished={onFinished} />
        }
      </div>
    );
  }

  onFinished() {
    this.setState({scoreSubmitted: true});
  }
}

export default YouWin;
