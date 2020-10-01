import React, { Component } from "react"

class Loser extends Component {
  restartGameSameWord = () => {
    this.props.restartGame(this.props.solutionId)
  }
  render() {
    return (
      <div id="loser">
        <h2>Game Over</h2>
        <p>Better luck next time</p>
        <button
          id="try-again"
          className="restart-btn"
          onClick={this.restartGameSameWord}
        >
          Try Again
        </button>
      </div>
    )
  }
}
export default Loser
