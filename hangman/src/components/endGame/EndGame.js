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
            level={this.props.level}
            score={this.props.score}
          />
        ) : (
          <Loser
            restartGame={this.props.restartGame}
            level={this.props.level}
            score={this.props.score}
          />
        )}
      </div>
    )
  }
}
export default EndGame
