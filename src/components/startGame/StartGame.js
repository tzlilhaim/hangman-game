import React, { Component } from "react"

class StartGame extends Component {
  startGame = () => {
    this.props.startGame()
  }
  render() {
    return (
      <div id="start-screen">
        <h1>Hangman</h1>
        <button id="start-game" onClick={this.startGame}>
          Start Game
        </button>
      </div>
    )
  }
}
export default StartGame
