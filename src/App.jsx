import React, { useReducer } from 'react';
import './App.css';

// Reducer function to handle game state changes
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return { squares: Array(9).fill(null), xIsNext: true, winner: null };
    case 'CLICK':
      const squares = state.squares.slice();
      if (calculateWinner(squares) || squares[action.index]) {
        return state;
      }
      squares[action.index] = state.xIsNext ? 'X' : 'O';
      return {
        squares: squares,
        xIsNext: !state.xIsNext,
        winner: calculateWinner(squares),
      };
    default:
      return state;
  }
};

const initialState = { squares: Array(9).fill(null), xIsNext: true, winner: null };

// Function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => dispatch({ type: 'CLICK', index: i })}>
        {state.squares[i]}
      </button>
    );
  };

  const resetGame = () => {
    dispatch({ type: 'RESET' });
  };

  const winner = state.winner;
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <>
    
    <div className="game">
    <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div><h4>{status}</h4></div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
    </>
  );
}

export default App;
