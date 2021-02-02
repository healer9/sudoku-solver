import React from 'react'

const Board = (props) => {
    return (
        <div className="board">
            {props.myBoard.map((val, i) => (
                <div key={i} className="row">
                    {val.map((num, j) => {
                        return (
                            <div key={i + j + 1}
                                className='col'>
                                {num ? <h3>{num}</h3> : <></>}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board
