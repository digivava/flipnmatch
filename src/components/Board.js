import React, { Component } from 'react';
import Card from './Card.js';
import matchData from '../api/matches.json';
import '../styles/Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardsInfo: this.makeCardsInfo()
    }
    // save which words we're playing with to localStorage
    this.saveState(this.state.cardsInfo);
  }

  render() {

    // make cards from wordpairs and randomize their positions in array,
    // so they will be in different order every time
    let cardsInfo = this.state.cardsInfo;
    let cards = this.renderCards(cardsInfo);

    return(
      <div className="Board">
        {cards}
      </div>
    );

  }

  ////// STATE PERSISTENCE //////

  checkSavedState() {
    // check local storage
    var board = localStorage.getItem('board');

    if (board) {
      return JSON.parse(board);
    } else {
      return false;
    }
  }

  saveState() {
    var board = this.state.cardsInfo;
    localStorage.setItem('board', JSON.stringify(board));
  }

  ////// CARD CREATION //////

  renderCards(cardsInfo) {
    let cards = [];
    var i = 0;
    for (let info of cardsInfo) {
      cards.push(<Card key={i} position={info.position} id={info.id} word={info.word} onFlip={this.props.flipCard} cannotFlip={this.props.cannotFlip} gameStarted={this.props.gameStarted} />);
      i++;
    }
    return cards;
  }

  makeCardsInfo() {

    var cardsInfo;
    // check if board state was saved to local storage
    var savedState = this.checkSavedState();
    // if there's stuff to load, set cardsInfo to whatever was saved
    if (savedState) {
      cardsInfo = savedState;
    } else { // starting fresh
      var wordPairs = this.getWordPairs();
      cardsInfo = this.makeMatches(wordPairs);
    }

    return cardsInfo;
  }

  // returns pairs of words for populating cards
  getWordPairs() {
    var wordPairs = matchData.match_items;

    // get random word pairs, enough to match number of totalPairs
    // will be different each time game is played
    wordPairs = this.shuffle(wordPairs).slice(0,this.props.totalPairs);

    return wordPairs;
  }

  makeMatches(wordPairs) {
    var cardList = [];

    for (let pair of wordPairs) {
      let engCard = {id: pair.item.id, word: pair.item.en};
      let jpnCard = {id: pair.item.id, word: pair.item.jp};
      cardList.push(engCard, jpnCard);
    }

    // randomize the positions of the cards
    cardList = this.shuffle(cardList);
    // keep track of the position of the cards for saving to localStorage
    cardList = this.savePosition(cardList)

    return cardList;
    // example output: [{id: 14564, word: "have", position: 0}, {id: 14564, word: "motteiru", position: 1}, ...]
  }

  savePosition(cardList) {
    var i = 0;
    for (let card of cardList) {
      card.position = i;
      i++;
    }
    return cardList;
  }

  shuffle(arr) {
    // did not reinvent wheel here. can reinvent if desired.
    var currentIndex = arr.length;
    var randomIndex;
    var tempValue;
    // while there are elements to shuffle, pick an element and swap with current element
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  }
}

export default Board;
