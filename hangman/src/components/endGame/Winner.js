import React, { Component } from "react"

class Winner extends Component {
  restartGameNextWord = () => {
    this.props.restartGame(this.props.solutionId + 1)
  }
  render() {
    return (
      <div id="winner">
        <h2>Game Over</h2>
        <p>Congratulations, you won!</p>
        <button
          id="next-word"
          className="restart-btn"
          onClick={this.restartGameNextWord}
        >
          Next Word
        </button>
      </div>
    )
  }
}
export default Winner
