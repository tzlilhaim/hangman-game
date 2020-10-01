import React, { Component } from "react"
import Winner from "./Winner"
import Loser from "./Loser"

class EndGame extends Component {
  render() {
    return (
      <div className="game-over">
        {this.props.isPlayerWon ? (
          <Winner
            restartGame={this.props.restartGame}
            solutionId={this.props.solutionId}
          />
        ) : (
          <Loser
            restartGame={this.props.restartGame}
            solutionId={this.props.solutionId}
          />
        )}
      </div>
    )
  }
}
export default EndGame
