import React, { useState } from 'react'
import Header from './components/Header'
import axios from 'axios'
import sudokuSolver from './sudokuSolver'
import Board from './components/Board'
import Footer from './components/Footer'

const App = () => {
  const [myBoard, setMyBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)))
  const [difficulty, setDifficulty] = useState('easy')
  const getBoard = () => {
    console.log(difficulty)
    axios.get('https://sugoku.herokuapp.com/board', {
      params: {
        difficulty: difficulty
      }
    })
      .then((response) => {
        const board = response.data.board
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board.length[i]; j++) {
            console.log(board[i][j])
            if (board[i][j] === 0)
              board[i][j] = null;
          }
        }
        // console.log(board)
        setMyBoard([...board])
      }).catch((err) => console.error(err))
  }

  const solveSudoku = () => {
    const getSolvedBoard = sudokuSolver(myBoard)
    // console.log(getSolvedBoard)
    setMyBoard([...getSolvedBoard])
  }

  return (
    <>
      <Header />
      <main>
        <Board myBoard={myBoard} />
        <div className="options">
          <div style={{ fontWeight: "bolder" }}>Difficulty:</div>
          <div>
            <input type="radio" name="1" onClick={() => setDifficulty('easy')} /> Easy
          </div>
          <div>
            <input type="radio" name="1" onClick={() => setDifficulty('medium')} /> Medium
          </div>
          <div>
            <input type="radio" name="1" onClick={() => setDifficulty('hard')} /> Hard
          </div>
          <div>
            <input type="radio" name="1" onClick={() => setDifficulty('random')} /> Random
          </div>
        </div>
        <div className="btn-container">
          <button className="get-btn" onClick={getBoard}>Get Board</button>
          <br />
          <button className="solve-btn" onClick={solveSudoku}>Solve</button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App