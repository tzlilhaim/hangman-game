import React, { Component } from "react"
import logo from "./logo.svg"
import Solution from "./components/Solution"
import Score from "./components/Score"
import Letters from "./components/Letters"
import StartGame from "./components/startGame/StartGame"
import EndGame from "./components/endGame/EndGame"
import EndLevel from "./components/endLevel/EndLevel"
import Hangman from "./components/Hangman"
import solutions from "./solutions"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solutions: solutions,
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
  resetStates = {
    letterStatus: async () => {
      let resetLetterStatus = this.generateLetterStatuses()
      await this.setState({ letterStatus: resetLetterStatus })
    },
    gameStatus: async () => {
      let resetGameStatus = this.state.gameStatus
      resetGameStatus.isGameOver = false
      resetGameStatus.isPlayerWon = false
      resetGameStatus.isGameStarted = true
      await this.setState({ gameStatus: resetGameStatus })
    },
    score: async () => {
      await this.setState({ score: 100 })
    },
  }
  findSolutionOfLevel = (level) => {
    const solution = this.state.solutions.find((s) => s.level === level)
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
        const word = this.findSolutionOfLevel(this.state.activeSolution.level)
          .word
        let isLetterInWord =
          word.includes(letter) || word.includes(letter.toLowerCase())
        if (isLetterInWord) {
          let updatedSolution = this.state.activeSolution
          updatedSolution.lettersToFind--
          this.setState({ activeSolution: updatedSolution }, () => {
            if (this.state.activeSolution.lettersToFind === 0) {
              if (
                this.state.activeSolution.level === this.state.solutions.length
              ) {
                this.endGame()
              }
            }
          })
        } else {
          const currScore = this.state.score
          if (currScore > 0) {
            this.setState({ score: currScore - 10 }, () => {
              if (this.state.score <= 0) {
                this.endGame()
              }
            })
          }
        }
      }
    )
  }
  setActiveSolution = (level) => {
    const uniqueLettersInWord = []
    this.findSolutionOfLevel(level)
      .word.split("")
      .forEach((letter) => {
        if (!uniqueLettersInWord.includes(letter.toUpperCase())) {
          uniqueLettersInWord.push(letter.toUpperCase())
        }
      })
    const lettersToFind = uniqueLettersInWord.length
    this.setState({
      activeSolution: { level, lettersToFind },
    })
  }
  getNextLevel = (level) => {
    const nextLevel = level + 1
    this.setActiveSolution(nextLevel)
    this.resetStates.letterStatus()
  }
  startGame = () => {
    this.setActiveSolution(1)
    this.resetStates.gameStatus()
    this.resetStates.letterStatus()
    this.resetStates.score()
  }

  render() {
    return (
      <div className="App">
        {this.state.gameStatus.isGameStarted ? (
          this.state.gameStatus.isGameOver ? (
            <div>
              <EndGame
                isPlayerWon={this.state.gameStatus.isPlayerWon}
                restartGame={this.startGame}
                level={this.state.activeSolution.level}
                score={this.state.score}
              />
            </div>
          ) : this.state.activeSolution.lettersToFind ? (
            <div>
              <Solution
                solution={this.findSolutionOfLevel(
                  this.state.activeSolution.level
                )}
                level={this.state.activeSolution.level}
                letterStatus={this.state.letterStatus}
              />
              <Score score={this.state.score} />
              <Letters
                letterStatus={this.state.letterStatus}
                selectLetter={this.selectLetter}
              />
              <Hangman score={this.state.score} />
            </div>
          ) : (
            <EndLevel
              solution={this.findSolutionOfLevel(
                this.state.activeSolution.level
              )}
              score={this.state.score}
              nextLevel={this.getNextLevel}
            />
          )
        ) : (
          <StartGame startGame={this.startGame} />
        )}
      </div>
    )
  }
}

export default App
