import React, { Component } from 'react';
import '../styles/Form.css';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {

    let handleChange = this.handleChange.bind(this);
    let handleSubmit = this.handleSubmit.bind(this);

    return (
    <div className="Form">
      <div className="Form-description">
        <p>Enter your name below to save your score.</p>
      </div>
      <div className="Form-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input type="text" name={this.state.value} onChange={handleChange} />
          </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendScore();
  }

  sendScore() {
    let url = 'http://localhost:3000/scores';

    let score = {
      score: {
        name: this.state.value,
        attempts: this.props.attempts,
        time: this.props.time
      }
    }

    var that = this;
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(score)
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      that.props.onFinished();
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
}


export default Form;
