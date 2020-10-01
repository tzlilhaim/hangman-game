import React, { Component } from "react"
import Letter from "./Letter"

class Solution extends Component {
  render() {
    const lettersOfWord = this.props.solution.word.split("")
    return (
      <div id="solution">
        <p id="hint">{this.props.solution.hint}</p>
        <p id="word">
          {lettersOfWord.map((letter, index) => {
            return (
              <Letter
                key={`solution-${index}`}
                letter={this.props.letterStatus[letter.toUpperCase()] ? letter : "_"}
                isAvailable={!!this.props.letterStatus[letter]}
              />
            )
          })}
        </p>
      </div>
    )
  }
}
export default Solution
