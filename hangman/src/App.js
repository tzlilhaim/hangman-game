import React, { Component } from "react"
import logo from "./logo.svg"
import Solution from "./components/Solution"
import Score from "./components/Score"
import Letters from "./components/Letters"
import StartGame from "./components/startGame/StartGame"
import EndGame from "./components/endGame/EndGame"
import EndLevel from "./components/endLevel/EndLevel"
import Hangman from "./components/Hangman"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatuses(),
      solutions: [
        {
          level: 1,
          word: "Soup",
          hint: "I'm a food but also a drink",
        },
        {
          level: 2,
          word: "Genie",
          hint: "I'm a magician trapped in a bottle",
        },
        {
          level: 3,
          word: "Moose",
          hint: "I'm an animal with hair products",
        },
        {
          level: 4,
          word: "Sponge",
          hint: "I'm full of holes but I still hold water",
        },
        {
          level: 5,
          word: "Future",
          hint: "I'm always in front of you, but I cannot be seen",
        },
        {
          level: 6,
          word: "Echo",
          hint: "What can’t talk but will reply when spoken to",
        },
        {
          level: 7,
          word: "Yarn",
          hint:
            "I’m found in socks, scarves and mittens; and often in the paws of playful kittens",
        },
        {
          level: 8,
          word: "Window",
          hint: "What invention lets you look right through a wall?",
        },
        {
          level: 9,
          word: "Secret",
          hint:
            "If you’ve got me, you mustn't share me; if you share me, you haven’t kept me. What am I?",
        },
        {
          level: 10,
          word: "Name",
          hint:
            "It belongs to you, but other people use it more than you do. What is it?",
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
  resetStates = {
    letterStatus: async () => {
      let resetLetterStatus = this.generateLetterStatuses()
      this.setState({ letterStatus: resetLetterStatus })
    },
    gameStatus: async () => {
      let resetGameStatus = this.state.gameStatus
      resetGameStatus.isGameOver = false
      resetGameStatus.isPlayerWon = false
      resetGameStatus.isGameStarted = true
      this.setState({ gameStatus: resetGameStatus })
    },
    score: async () => {
      this.setState({ score: 100 })
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
              if (this.state.score === 0) {
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
  getNextLevel = async (level) => {
    const nextLevel = level + 1
    await this.setActiveSolution(nextLevel)
    await this.resetStates.letterStatus()
  }
  startGame = async () => {
    this.setActiveSolution(1)
    await this.resetStates.gameStatus()
    await this.resetStates.letterStatus()
    await this.resetStates.score()
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
