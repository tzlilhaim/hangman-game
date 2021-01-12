import React, { Component } from "react"
import Hangman from "../Hangman"

class Loser extends Component {
  startNewGame = () => {
    this.props.restartGame()
  }
  render() {
    return (
      <div id="loser">
        <h2>Game Over</h2>
        <p>Better luck next time...</p>
        <button
          id="try-again"
          className="restart-btn"
          onClick={this.startNewGame}
        >
          Start Over
        </button>
        <Hangman score={this.props.score} />
      </div>
    )
  }
}
export default Loser
