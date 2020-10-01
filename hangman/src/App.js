import React, { Component } from "react"
import logo from "./logo.svg"
import Solution from "./components/Solution"
import Score from "./components/Score"
import Letters from "./components/Letters"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solution:{word:"soup",hint:"winter comfort food"},
      score:100
    }
  }
  generateLetterStatuses() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
  }
  render() {
    return (
      <div className="App">
        <Solution solution={this.state.solution} letterStatus={this.state.letterStatus} />
        <Score score={this.state.score}/>
        <Letters letterStatus={this.state.letterStatus} />
      </div>
    )
  }
}

export default App
