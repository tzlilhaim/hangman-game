import React, { Component } from "react"

class Letter extends Component {
  selectThisLetter = () => {
    this.props.selectLetter(this.props.letter)
  }
  render() {
    return (
      <span
        className="letter"
        data-is-available={this.props.isAvailable}
        disabled={!this.props.isAvailable}
        onClick={this.selectThisLetter}
      >
        {this.props.letter}
      </span>
    )
  }
}
export default Letter
