import React, { Component } from "react"
import NextLevel from "./NextLevel"

class EndLevel extends Component {
  render() {
    return (
      <div className="level-over">
        <NextLevel
          solution={this.props.solution}
          score={this.props.score}
          nextLevel={this.props.nextLevel}
        />
      </div>
    )
  }
}
export default EndLevel
