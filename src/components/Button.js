import React from 'react';

const Button = props => {

  const passScore = () => {
    if (props.gameState === 'correct') {
      props.nextWord(true)
    } else {
      props.nextWord(false)
    }
  }

  return (
    <button onClick={() => passScore()}>Next Word</button>
  )
}
export default Button
