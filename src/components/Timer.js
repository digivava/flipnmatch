import React, { Component } from 'react';
import '../styles/Timer.css';

class Timer extends Component {
  render() {

    // make elapsed time more readable
    let time = this.props.convertToMin(this.props.seconds);

    return(
      <div className="Timer">
        {"Time: " + time}
      </div>
    );
  }

}

export default Timer;
