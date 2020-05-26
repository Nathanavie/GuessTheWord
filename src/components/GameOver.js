import React from 'react';

const GameOver = props => {

  if (props.gameState === 'incorrect') {
    return (
      <>
        <h2>That answer was {props.gameState}</h2>
        <button onClick={() => props.nextWord(false)}>Next Word</button>
      </>
    )
  } else if (props.gameState === 'correct') {
    return (
      <>
        <h2>That answer was {props.gameState}</h2>
        <button onClick={() => props.nextWord(true)}>Next Word</button>
      </>
    )
  }
}
export default GameOver
