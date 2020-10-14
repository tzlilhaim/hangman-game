import React, { Component } from "react"

class Score extends Component {
  render() {
    const score = this.props.score
    return (
      <div
        className={score > 79 ? "high" : score > 49 ? "medium" : "low"}
        id="score"
      >
        {score}
      </div>
    )
  }
}
export default Score
