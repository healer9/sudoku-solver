const isSafe = (board, r, c, num) => {
    for (let i = 0; i < 9; i++) {
        if (board[i][c] === num || board[r][i] === num)
            return false
    }

    let sx = r - r % 3
    let sy = c - c % 3

    // check in sub-grid
    for (let x = sx; x < sx + 3; x++) {
        for (let y = sy; y < sy + 3; y++) {
            if (board[x][y] === num)
                return false
        }
    }

    return true
}

const solveSudokuHelper = (board, r, c) => {
    // base case
    if (r === 9) {
        return true
    } if (c === 9) {
        return solveSudokuHelper(board, r + 1, 0)
    }
    // pre-filled cell, skip it
    if (board[r][c] !== 0) {
        return solveSudokuHelper(board, r, c + 1)
    }

    // brute-force
    for (let i = 1; i <= 9; i++) {
        if (isSafe(board, r, c, i)) {
            board[r][c] = i
            let success = solveSudokuHelper(board, r, c + 1)
            if (success === true) {
                return true
            }
            // back-track
            board[r][c] = 0
        }
    }
    return false
}

const sudokuSolver = (board) => {
    solveSudokuHelper(board, 0, 0)
    return board
}

export default sudokuSolver