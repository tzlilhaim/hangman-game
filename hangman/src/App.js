import React, { Component } from "react"
import logo from "./logo.svg"
import Solution from "./components/Solution"
import Score from "./components/Score"
import Letters from "./components/Letters"
import StartGame from "./components/startGame/StartGame"
import EndGame from "./components/endGame/EndGame"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solutions: [
        {
          id: 0,
          word: "Soup",
          hint: "A winter comfort food",
        },
        {
          id: 1,
          word: "Genie",
          hint: "A magician trapped in a bottle",
        },
      ],
      activeSolution: {},
      score: 100,
      gameStatus: {
        isGameStarted: false,
        isGameOver: false,
        isPlayerWon: false,
      },
    }
  }
  generateLetterStatuses() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
  }
  findSolutionById = (id) => {
    const solution = this.state.solutions.find((s) => s.id === id)
    return solution
  }
  endGame = () => {
    let updatedGameStatus = this.state.gameStatus
    updatedGameStatus.isGameOver = true
    updatedGameStatus.isPlayerWon = this.state.score ? true : false
    this.setState({ gameStatus: updatedGameStatus })
  }
  selectLetter = (letter) => {
    let allLetters = { ...this.state.letterStatus }
    allLetters[letter] = true
    this.setState(
      {
        letterStatus: allLetters,
      },
      () => {
        let currScore = this.state.score
        const word = this.findSolutionById(this.state.activeSolution.id).word
        let isLetterInWord =
          word.includes(letter) || word.includes(letter.toLowerCase())
        if (isLetterInWord) {
          if (currScore < 100) {
            this.setState({ score: currScore + 10 })
          }
          let updatedSolution = this.state.activeSolution
          updatedSolution.lettersToFind--
          this.setState({ activeSolution: updatedSolution }, () => {
            if (this.state.activeSolution.lettersToFind === 0) {
              this.endGame()
            }
          })
        } else {
          if (currScore > 0) {
            this.setState({ score: currScore - 10 }, () => {
              if (this.state.score === 0) {
                this.endGame()
              }
            })
          }
        }
      }
    )
  }
  setActiveSolution = (currId) => {
    const id = currId > this.state.solutions.length - 1 ? 0 : currId
    const uniqueLettersInWord = []
    this.findSolutionById(id)
      .word.split("")
      .forEach((letter) => {
        if (!uniqueLettersInWord.includes(letter)) {
          uniqueLettersInWord.push(letter)
        }
      })
    let lettersToFind = uniqueLettersInWord.length
    this.setState({
      activeSolution: { id, lettersToFind },
    })
  }
  restartGame = async (solutionId) => {
    if (this.state.activeSolution.id !== solutionId) {
      await this.setActiveSolution(solutionId)
    }
    let resetGameStatus = this.state.gameStatus
    resetGameStatus.isGameOver = false
    resetGameStatus.isPlayerWon = false
    this.setState({ gameStatus: resetGameStatus })
    let resetLetterStatus = this.generateLetterStatuses()
    this.setState({ letterStatus: resetLetterStatus })
    this.setState({ score: 100 })
  }
  startGame = () => {
    this.setActiveSolution(0)
    this.state.gameStatus.isGameStarted = true
  }

  render() {
    return (
      <div className="App">
        {this.state.gameStatus.isGameStarted ? (
          this.state.gameStatus.isGameOver ? (
            <EndGame
              isPlayerWon={this.state.gameStatus.isPlayerWon}
              restartGame={this.restartGame}
              solutionId={this.state.activeSolution.id}
            />
          ) : (
            <div>
              <Solution
                solution={this.findSolutionById(this.state.activeSolution.id)}
                letterStatus={this.state.letterStatus}
              />
              <Score score={this.state.score} />
              <Letters
                letterStatus={this.state.letterStatus}
                selectLetter={this.selectLetter}
              />
            </div>
          )
        ) : (
          <StartGame startGame={this.startGame} />
        )}
      </div>
    )
  }
}

export default App
