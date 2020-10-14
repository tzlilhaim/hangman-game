import React, { Component } from "react"
import Score from "../Score"

class NextLevel extends Component {
  goToNextLevel = () => {
    this.props.nextLevel(this.props.solution.level)
  }
  render() {
    return (
      <div id="end-level">
        <h2>
          Congratulations, you've passed level {this.props.solution.level}!
        </h2>
        <div>
          <span>The word was: </span>
          <span id="correct-solution">{this.props.solution.word}</span>
        </div>
        Current score: <Score score={this.props.score} />
        <p>Go on to the next level if you're brave enough...</p>
        <button id="next-word" onClick={this.goToNextLevel}>
          Next Level
        </button>
      </div>
    )
  }
}
export default NextLevel
