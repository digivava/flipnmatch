import React, { Component } from 'react';
import '../styles/Card.css';

class Card extends Component {

  constructor(props) {
    super(props);

    var savedState = this.checkSavedState();

    if (savedState) {
      this.state = {
        flipStatus: savedState.flipStatus
      }
    } else {
      this.state = {
        flipStatus: false
      }
    }
    this.saveState();
  }

  render() {

    let contents;
    let classes = "Card";

    // gray-out if the game hasn't started yet
    if (!this.props.gameStarted) {
      classes += " Card-pregame";
    }

    // change visuals and display word once a card is flipped
    if (this.state.flipStatus) {
      contents = this.props.word;
      classes += " Card-flipped";
    } else {
      contents = "";
    }

    return (
      <div className={classes} onClick={() => this.onCardClick()}>
        {contents}
      </div>
    );
  }

  onCardClick() {
    this.props.onFlip(this); // uses Card context when inside of onFlip
  }

  ////// STATE PERSISTENCE //////

  checkSavedState() {
    // check local storage
    let cardNumber = "card" + String(this.props.position)

    var storedCard = localStorage.getItem(cardNumber);

    if (storedCard) {
      return JSON.parse(storedCard);
    } else {
      return false;
    }
  }

  saveState() {
    // add current card to local storage
    let cardNumber = "card" + String(this.props.position)

    // find out if this card already exists in localStorage
    let storedCard = JSON.parse(localStorage.getItem(cardNumber));

    // replace object if it already exists, otherwise create
    if (storedCard) {
      storedCard.flipStatus = this.state.flipStatus;
      localStorage.setItem(cardNumber, JSON.stringify(storedCard));
    } else {
      localStorage.setItem(cardNumber, JSON.stringify({flipStatus: this.state.flipStatus}))
    }
    // card1: {flipStatus: "flipped"}
  }

}

export default Card;
