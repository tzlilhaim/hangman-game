import React, { Component } from "react"

class Hangman extends Component {
  render() {
    return <div id="hangman" data-score={this.props.score}></div>
  }
}
export default Hangman
