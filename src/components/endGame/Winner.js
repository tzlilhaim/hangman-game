import React, { Component } from "react"
import Hangman from "../Hangman"
import Score from "../Score"

class Winner extends Component {
  startNewGame = () => {
    this.props.restartGame()
  }
  render() {
    return (
      <div id="winner">
        <h2>Congratulations!</h2>
        <p>You've solved all levels.</p>
        <p>Final score: <Score score={this.props.score}/></p>
        <button
          id="next-word"
          className="restart-btn"
          onClick={this.startNewGame}
        >
          Start Over
        </button>
        <Hangman score="999" />
      </div>
    )
  }
}
export default Winner
