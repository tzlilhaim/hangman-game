import React, { Component } from "react"
import Letter from "./Letter"

class Letters extends Component {
  render() {
    const letters = Object.keys(this.props.letterStatus)
    return (
      <div id="letters"><p>Available letters:</p>
        {letters.map((letter) => {
          return (
            <Letter
              key={letter}
              letter={letter}
              isAvailable={!this.props.letterStatus[letter]}
            />
          )
        })}
      </div>
    )
  }
}
export default Letters
