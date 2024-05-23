import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let cell of row) {
        if (!cell) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(y, x) {
    setBoard((oldBoard) => {
      // const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // make a copy and flip it
      let newBoard = oldBoard.map((row) => [...row]);
      // flip the clicked cell
      flipCell(y, x, newBoard);
      // flip the neighbors
      flipCell(y - 1, x, newBoard); // above
      flipCell(y + 1, x, newBoard); // below
      flipCell(y, x - 1, newBoard); // left
      flipCell(y, x + 1, newBoard); // right

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // make table board
  return (
    <>
      <div>{hasWon() ? "You won!" : ""}</div>
      <table className="Board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  flipCellsAroundMe={() => flipCellsAround(rowIndex, colIndex)}
                  isLit={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Board;
