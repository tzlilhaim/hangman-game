import React, { Component } from "react"

class Letter extends Component {
  render() {
    console.log(this.props.isAvailable)
    return <span className="letter" data-is-available={this.props.isAvailable}>{this.props.letter}</span>
  }
}
export default Letter
