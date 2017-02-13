import React, { Component } from 'react';
import '../styles/StartButton.css';

class StartButton extends Component {

  render() {

    let classes = "StartButton-button"
    if (this.props.hide) {
      // don't show this button after game starts
      classes += " StartButton-hidden";
    }

    return (
      <div className="StartButton">
        <button className={classes} onClick={this.props.onClick}>
          Start
        </button>
      </div>
    );
  }

}

export default StartButton;
